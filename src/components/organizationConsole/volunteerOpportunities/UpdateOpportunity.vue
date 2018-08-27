<template>
  <div>
    <form class="box">
      <h1>Edit Opportunity</h1>
      <div class="field">
        <label>Name</label>
        <input
          v-model="opportunity.name"
          type="text">
      </div>

      <div class="field">
        <label>Description</label>
        <input
          v-model="opportunity.description"
          type="text">
      </div>
      <div class="field">
        <label>Start Time</label>
        <datepicker
          placeholder="Select Date"
          v-model="opportunity.startTime"
        ></datepicker>
      </div>
      <div class="field">
        <label>End Time</label>
        <datepicker
          placeholder="Select Date"
          v-model="opportunity.endTime"
        ></datepicker>
      </div>
      <div class="field">
        <label>Location</label>
        <input
          v-model="opportunity.location"
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
import { UPDATE_OPPORTUNITY_MUTATION, ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
import { GC_USER_ID } from '../../../constants/settings'

export default {
  name: 'UpdateOpportunity',
  components: { Datepicker },
  data () {
    return {
      name: '',
      description: '',
      startTime: null,
      endTime: null,
      address: '',
      opportunity: this.$store.state.currentOpportunity
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
      console.log('Interested Users', this.opportunity)
      let test = this.opportunity.interestedUsers.slice(0)

      this.$apollo.mutate({
        mutation: UPDATE_OPPORTUNITY_MUTATION,
        variables: {
          id: this.opportunity.id,
          name: this.opportunity.name,
          ownedById: currentUser,
          description: this.opportunity.description,
          startTime: this.opportunity.startTime,
          endTime: this.opportunity.endTime,
          address: this.opportunity.address,
          interestedUsers: test
        },
        update: (store, { data: { updateOpportunity } }) => {
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: updateOpportunity })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('updateActiveModal', null)
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
