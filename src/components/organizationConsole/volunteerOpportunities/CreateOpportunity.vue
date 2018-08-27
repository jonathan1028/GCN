<template>
  <div>
    <form class="box">
      <h1>New Opportunity</h1>
      <div class="field">
        <label>Name</label>
        <input
          v-model="name"
          type="text">
      </div>

      <div class="field">
        <label>Description</label>
        <input
          v-model="description"
          type="text">
      </div>
      <div class="field">
        <label>Start Time</label>
        <datepicker
          placeholder="Select Date"
          v-model="startTime"
        ></datepicker>
      </div>
      <div class="field">
        <label>End Time</label>
        <datepicker
          placeholder="Select Date"
          v-model="endTime"
        ></datepicker>
      </div>
      <div class="field">
        <label>Location</label>
        <input
          v-model="address"
          type="text">
      </div>
      <button @click.prevent="cancel()">Cancel</button>
      <button @click.prevent="create()">Submit</button>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
// import { CREATE_PERSON_MUTATION } from '../constants/graphql'
import { CREATE_OPPORTUNITY_MUTATION, ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
import { GC_USER_ID } from '../../../constants/settings'

export default {
  name: 'CreateOpportunity',
  components: { Datepicker },
  data () {
    return {
      name: '',
      description: '',
      startTime: null,
      endTime: null,
      address: '',
      activeModal: this.$store.state.activeModal
    }
  },
  methods: {
    cancel () {
      this.$store.commit('updateActiveModal', null)
    },
    create () {
      // Checks permissions
      const currentUser = localStorage.getItem(GC_USER_ID)
      if (!currentUser) {
        console.error('No user logged in')
        return
      }
      console.log('User', currentUser)

      // Assign data from form inputs
      // const newDisplayName = this.firstName + ' ' + this.lastName
      // const firstName = this.firstName
      // const lastName = this.lastName
      // const email = this.email
      // const phone1 = this.phone1
      // // Clears out data??
      // this.firstName = ''
      // this.lastName = ''
      // this.phone1 = ''
      // this.email = ''

      this.$apollo.mutate({
        mutation: CREATE_OPPORTUNITY_MUTATION,
        variables: {
          // Sets variables in graphql.js
          // eslint-disable-next-line
          name: this.name,
          ownedById: currentUser,
          description: this.description,
          startTime: this.startTime,
          endTime: this.endTime,
          address: this.address
        },
        update: (store, { data: { createOpportunity } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
          // We add the new data
          data.allOpportunities.push(createOpportunity)
          // We update the cache
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleCreateOpportunity')
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 2vw;
}
label {
  width: 30%;
  display: block;
  text-align: right;
  padding-right: 5%;
  /* border: .5px solid lightgray; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.field {
  width: 50%;
  /* border: .5px solid lightgray; */
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
input{
  height: 3vh;
  font-size: 2vh;
  border: .25vh solid lightgray;
}
input:hover{
  border-bottom: .25vh solid var(--color1);
}
</style>
