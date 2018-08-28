<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
      <h2>Add Volunteering Hours</h2>
    </div>
    <div class="modal-body">
      <form action="">
        <div class="field">
          <label for="">Title:</label>
          <input
            v-model="title"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Start Time:</label>
          <flat-pickr
            v-model="startTime"
            :config="config"
          ></flat-pickr>
        </div>
        <div class="field">
          <label for="">End Time:</label>
          <flat-pickr
            v-model="endTime"
            :config="config"
          ></flat-pickr>
        </div>
        <div class="field">
          <label for="">Location:</label>
          <input
            v-model="location"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Description:</label>
          <input
            v-model="description"
            type="text"
            placeholder="">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="_button1"
        @click="create()"
      >
        Create
      </button>
      <button
        class="_button3"
        @click="cancel()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql/opportunities'
import { CREATE_RESPONSE_MUTATION, DELETE_RESPONSE_MUTATION } from '../../../constants/graphql/responses'
import { CREATE_VOLUNTEERING_LOG_MUTATION, ALL_VOLUNTEERING_LOGS_QUERY } from '../../../constants/graphql/volunteering-logs'

import { GC_USER_ID } from '../../../constants/settings'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'CreateOpportunity',
  components: { Datepicker, flatPickr },
  data () {
    return {
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: '',
      activeModal: this.$store.state.createVolunteeringLogModal,
      config: {
        // wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'F j, Y - h:iK',
        altInput: true,
        dateFormat: 'Z',
        enableTime: true
      }
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleCreateVolunteeringLog')
    },
    create (opportunity) {
      // Checks permissions
      const currentUser = localStorage.getItem(GC_USER_ID)
      if (!currentUser) {
        console.error('No user logged in')
        return
      }
      this.$apollo.mutate({
        mutation: CREATE_VOLUNTEERING_LOG_MUTATION,
        variables: {
          // Sets variables in graphql.js
          // eslint-disable-next-line
          title: this.title,
          ownedById: currentUser,
          description: this.description,
          startTime: this.startTime,
          endTime: this.endTime,
          location: this.location
        },
        update: (store, { data: { createVolunteeringLog } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_VOLUNTEERING_LOGS_QUERY })
          // We add the new data
          data.allVolunteeringLogs.push(createVolunteeringLog)
          // We update the cache
          store.writeQuery({ query: ALL_VOLUNTEERING_LOGS_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        console.log('Test Ressult', result)
        this.$store.dispatch('createNotification', `Volunteering time logged for ${this.title}`)
        // create response
        let userId = localStorage.getItem('graphcool-user-id')
        let opportunity = this.$store.state.selectedOpportunity
        let type = 'Attended'
        // Check to see if user has responded yet
        let response = opportunity.responses.find(x => x.ownedBy.id === userId)
        console.log('Response', response)

        if (response && response.type !== type) {
          this.$apollo.mutate({
            mutation: DELETE_RESPONSE_MUTATION,
            variables: {
              id: response.id
            },
            update: (cache, { data: { deleteResponse } }) => {
              // For some reason when the data is coming from the store, the response has already been deleted
              // Not sure what is causing this
              let { allOpportunities } = cache.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
              // Find index of Opportunity in store
              let storedOpportunity = allOpportunities.find(x => x.id === opportunity.id)
              console.log('Stored Opportunity', storedOpportunity)

              let index = storedOpportunity.responses.findIndex(x => x.id === response.id)
              if (index !== -1) {
                storedOpportunity.responses.splice(index, 1)
              }
              console.log('Stored Opportunity Edit', storedOpportunity)
              // Write new data back to the store
              cache.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: { allOpportunities: allOpportunities } })
            }
          }).then((data) => {
            this.$apollo.mutate({
              mutation: CREATE_RESPONSE_MUTATION,
              variables: {
                type: type,
                ownedById: userId,
                opportunityId: opportunity.id
              },
              update: (store, { data: { createResponse } }) => {
                // Pull data from the store
                let data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
                // Create a local version of the object
                let user = this.$store.state.auth.user
                console.log('Update Data', createResponse)
                createResponse['type'] = type
                createResponse['ownedBy'] = user
                createResponse['opportunityId'] = opportunity.id
                createResponse['createdAt'] = new Date()
                // Add the object to the query
                let index = data.allOpportunities.findIndex(x => x.id === opportunity.id)
                if (index !== -1) {
                  data.allOpportunities[index].responses.push(createResponse)
                }
                // Write new data back to the store
                store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
              }
            })
          })
        }

        // If user has not yet responded create Reponse object
        if (!response) {
          this.$apollo.mutate({
            mutation: CREATE_RESPONSE_MUTATION,
            variables: {
              type: type,
              ownedById: userId,
              opportunityId: opportunity.id
            },
            update: (store, { data: { createResponse } }) => {
              // Pull data from the store
              let data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
              // Create a local version of the object
              let user = this.$store.state.auth.user
              console.log('Update Data', createResponse)
              createResponse['type'] = type
              createResponse['ownedBy'] = user
              createResponse['opportunityId'] = opportunity.id
              createResponse['createdAt'] = new Date()
              // Add the object to the query
              let index = data.allOpportunities.findIndex(x => x.id === opportunity.id)
              if (index !== -1) {
                data.allOpportunities[index].responses.push(createResponse)
              }
              // Write new data back to the store
              store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
            }
          })
        }
      })
      this.$store.commit('toggleCreateVolunteeringLog')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 24vw;
  top: 15vh;
  width: 45vw; /* Full width */
  height: auto; /* Full height */
  margin-left: auto;
  margin-right: auto;
  padding: 5vh;
  // overflow: auto; /* Enable scroll if needed */
  opacity: 1;
  background-color: #fefefe;
  animation-name: animatetop;
  animation-duration: 0.4s
}
.close-button {
    color: #aaa;
    float: right;
    font-size: 5vh;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.modal-header {
  border-bottom: .15vh solid var(--theme-color1);
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-body {
  // padding: 2px 16px;
}
.modal-footer {
  margin-top: 5vh;
  display: flex;
  justify-content: space-around;
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-content {
}
/* Add Animation */
@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 20vh; opacity: 1}
}
.modal-background {
  z-index: -1;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: #888;
  // opacity: 0.5;
}
</style>
