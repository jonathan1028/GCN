<template>
  <div class="component">
    <div class="header">
      <div>New Opportunity</div>
      <div
        class="close-button"
        @click.prevent="cancel()"
      >
        <icon
          class="icon"
          name="times"
        ></icon>
      </div>
    </div>
    <hr>
    <div class="form">
      <div class="row">
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
      </div>
      <div class="row">
        <div class="date-field">
          <label>Start Time</label>
          <datepicker
            placeholder="Select Date"
            v-model="startTime"
          ></datepicker>
        </div>
        <div class="date-field">
          <label>End Time</label>
          <datepicker
            placeholder="Select Date"
            v-model="endTime"
          ></datepicker>
        </div>
      </div>
      <!-- <div>Location</div> -->
      <div class="divider"></div>
      <div class="lead-row">
        <div class="field">
          <label>Location Name</label>
          <input
            v-model="locationName"
            type="text">
        </div>
        <div class="field">
          <label>Address</label>
          <input
            v-model="addressLine1"
            type="text">
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label>City</label>
          <input
            v-model="city"
            type="text">
        </div>
        <div class="field">
          <label>State</label>
          <input
            v-model="state"
            type="text">
        </div>
        <div class="field">
          <label>Zipcode</label>
          <input
            v-model="zipcode"
            type="text">
        </div>
      </div>
    </div>
    <div class="buttons-row">
      <button
        class="_button1"
        @click.prevent="create()">Submit</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { CREATE_OPPORTUNITY_MUTATION } from '../../../constants/graphql/opportunities'
import { GET_ORGANIZATION_QUERY } from '../../../constants/graphql/organizations'
import { CREATE_LOCATION_MUTATION } from '../../../constants/graphql/locations'

export default {
  name: 'CreateOpportunity',
  components: { Datepicker },
  data () {
    return {
      name: '',
      description: '',
      startTime: null,
      endTime: null,
      locationName: '',
      addressLine1: '',
      city: '',
      state: '',
      zipcode: '',
      activeModal: this.$store.state.activeModal
    }
  },
  methods: {
    cancel () {
      this.$store.commit('updateActiveModal', null)
    },
    create () {
      console.log('Start Time Set', this.startTime)

      this.$apollo.mutate({
        mutation: CREATE_OPPORTUNITY_MUTATION,
        variables: {
          // Sets variables in graphql.js
          // eslint-disable-next-line
          name: this.name,
          ownedById: this.$store.state.auth.user.id,
          organizationId: this.$store.state.currentOrganization.id,
          description: this.description,
          startTime: this.startTime,
          endTime: this.endTime,
          address: this.address
        },
        update: (store, { data: { createOpportunity } }) => {
          // Pull data from the stored query
          const data = store.readQuery({
            query: GET_ORGANIZATION_QUERY,
            variables: {
              id: this.$store.state.currentOrganization.id
            }
          })
          // We add the new data
          data.Organization.opportunities.push(createOpportunity)
          // We update the cache
          store.writeQuery({ query: GET_ORGANIZATION_QUERY, data: data })
          console.log('Organization.opportunities in cache updated')
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        console.log('Opportunity Created', result)
        this.$apollo.mutate({
          mutation: CREATE_LOCATION_MUTATION,
          variables: {
            opportunityId: result.data.createOpportunity.id,
            name: this.locationName,
            addressLine1: this.addressLine1,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode
          }
        }).catch((error) => {
          console.error(error)
        })
      })
      this.$store.commit('toggleCreateOpportunity')
    }
  }
}
</script>
<style lang="scss" scoped>
.divider {
  border-bottom: 1px dotted lightgray;
  background-color: lightgray;
  color: lightgray;
}
.component {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  // grid-template-areas:
  //    "
  //    "
  grid-column-gap: 2%;
  background-color: white;
  margin-bottom: 1vh;
  padding: 0vh 2vh 2vh;
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;
  // border-radius: 3vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--font-color1);
  font-size: 4vh;
  padding-bottom: 0.5vh;
  .close-button {
    // border: 1px solid black;
    display: flex;
    align-items: center;
    .icon {
      color: var(--font-color1);
      width: auto;
      height: 4vh;
      cursor: pointer;
    }
  }
}
.form {
  margin-top: 2vh;
  // border: 1px solid black;
}
.buttons-row {
  text-align: right;
}
._button1 {
  margin-top: 1vh;
}
.row {
  display: flex;
  align-items: flex-end;
  margin-top: 1vh;
}
.lead-row {
  display: flex;
  align-items: flex-end;
  margin-top: 4vh;
}
.field {
  width: 100%;
  /* border: .5px solid lightgray; */
  margin-bottom: 1%;
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
}
.date-field {
  width: 100%;
  margin-right: 10%;
  // border: .5px solid lightgray;
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    width: 20%;
  }
}
label {
  color: var(--font-color3);
  font-size: 2vh;
  width: 100%;
  display: block;
  // text-align: right;
  padding-right: 5%;
  /* border: .5px solid lightgray; */
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  // border: 1px solid black;
}
input{
  width: 80%;
  height: 3vh;
  font-size: 2vh;
  border: none;
  border-bottom: .25vh solid lightgray;
}
input:hover{
  // border-bottom: .25vh solid var(--color1);
}
</style>
