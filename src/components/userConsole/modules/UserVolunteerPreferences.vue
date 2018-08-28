<template>
  <div class="">
    <label for="">Location:</label>
    <div class="field">
      <input
        v-model="User.preferences.opportunitiesLocationRemote"
        type="checkbox"
        placeholder="">
      <label for="">Remote</label>
      <input
        v-model="User.preferences.opportunitiesLocationOnsite"
        type="checkbox"
        placeholder="">
      <label for="">Onsite</label>
    </div>
    <label for="">Frequency:</label>
    <div class="field">
      <input
        v-model="User.preferences.opportunitiesOneTime"
        type="checkbox"
        placeholder="">
      <label for="">One Time</label>
      <input
        v-model="User.preferences.opportunitiesRecurring"
        type="checkbox"
        placeholder="">
      <label for="">Recurring</label>
    </div>
    <label for="">Receive Emails:</label>
    <div class="field">
      <input type="radio" id="one" value="None" v-model="User.preferences.opportunitiesEmailFrequency">
      <label for="one">No Emails</label>
      <input type="radio" id="two" value="Daily" v-model="User.preferences.opportunitiesEmailFrequency">
      <label for="two">Daily</label>
      <input type="radio" id="three" value="Weekly" v-model="User.preferences.opportunitiesEmailFrequency">
      <label for="three">Weekly</label>
      <span>Picked: {{ User.preferences.opportunitiesEmailFrequency }}</span>
    </div>
    <div class="text-input field">
      <label for="">Volunteer Interest:</label>
      <input
        type="text"
        placeholder="">
    </div>
    <div class="text-input field">
      <label for="">Keyword:</label>
      <input
        type="text"
        placeholder="">
    </div>
    <div class="buttonsRow">
      <button class="_button1" @click.prevent='update()'>Save Changes</button>
      <button
        class="_button3">Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { GET_USER_QUERY, CREATE_USER_PREFERENCES_MUTATION, UPDATE_USER_PREFERENCES_MUTATION } from '../../../constants/graphql/users'

export default {
  name: 'UserVolunteerPreferences',
  data () {
    return {
      keyword: '',
      userId: this.$store.state.auth.user.id,
      test: true,
      User: {
        preferences: {
          opportunitiesLocationRemote: false,
          opportunitiesLocationOnsite: false,
          opportunitiesOneTime: false,
          opportunitiesRecurring: false,
          opportunitiesEmailFrequency: 'None'
        }
      }
    }
  },
  methods: {
    update () {
      console.log('Update User Ran', this.User.birthYear)
      if (this.User.preferences.id) {
        this.$apollo.mutate({
          mutation: UPDATE_USER_PREFERENCES_MUTATION,
          variables: {
            id: this.User.preferences.id,
            opportunitiesLocationRemote: this.User.preferences.opportunitiesLocationRemote,
            opportunitiesLocationOnsite: this.User.preferences.opportunitiesLocationOnsite,
            opportunitiesOneTime: this.User.preferences.opportunitiesOneTime,
            opportunitiesRecurring: this.User.preferences.opportunitiesRecurring,
            opportunitiesEmailFrequency: this.User.preferences.opportunitiesEmailFrequency
          }
        }).catch((error) => {
          console.error(error)
        })
      } else {
        this.$apollo.mutate({
          mutation: CREATE_USER_PREFERENCES_MUTATION,
          variables: {
            ownedById: this.userId,
            opportunitiesLocationRemote: this.User.preferences.opportunitiesLocationRemote,
            opportunitiesLocationOnsite: this.User.preferences.opportunitiesLocationOnsite,
            opportunitiesOneTime: this.User.preferences.opportunitiesOneTime,
            opportunitiesRecurring: this.User.preferences.opportunitiesRecurring,
            opportunitiesEmailFrequency: this.User.preferences.opportunitiesEmailFrequency
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  },
  apollo: {
    User: {
      query: GET_USER_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.userId
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo data is read only
        this.User = JSON.parse(JSON.stringify(data.User))
        console.log('User', this.User)
        // This initializes a User.preferences object if one has not been previously created
        if (!this.User.preferences) {
          this.User['preferences'] = {
            opportunitiesLocationRemote: false,
            opportunitiesLocationOnsite: false,
            opportunitiesOneTime: false,
            opportunitiesRecurring: false,
            opportunitiesEmailFrequency: 'None'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  // width: 100%;
  margin-bottom: 3vh;
}
.text-input {
  input {
    width: 98%;
    padding-left: 1vw;
    font-size: 2vh;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: .25vh solid lightgray;
  }
}
.buttonsRow {
  width: 100%;
  // border: 1px solid red;
  margin-top: 5vh;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  button {
    width: 20vw;
    cursor: pointer;
  }
}
</style>
