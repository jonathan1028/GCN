<template>
  <div class="modal-background">
    <div class="pageLayout modal-background">
      <div class="profileHeader">
        <div class="profileImage"></div>
        <div class="user-name">{{Organization.name}}</div>
        <div>Location:</div>
        <div>Last Login:</div>
        <div>Joined:</div>
      </div>
      <div class="tabs">
        <div
          v-bind:class="{ 'active-tab': activeTab === 'profile' }"
          class="tab"
          @click.prevent="isActiveTab('profile')"
        >
          Profile
        </div>
        <div
          v-bind:class="{ 'active-tab': activeTab === 'personnel' }"
          class="tab"
          @click.prevent="isActiveTab('personnel')"
        >
          My Personnel
        </div>
        <div
          v-bind:class="{ 'active-tab': activeTab === 'volunteerLogging'}"
          class="tab"
          @click.prevent="isActiveTab('volunteerLogging')"
        >
          My Volunteer Logging
        </div>
        <div
          v-bind:class="{ 'active-tab': activeTab === 'privacyStatement' }"
          class="tab"
          @click.prevent="isActiveTab('privacyStatement')"
        >
          Privacy Statement
        </div>
      </div>
      <div class="profile-panels">
        <!-- ------------------------------ Profile Panel ------------------------------------ -->
        <div
            class="panel"
            v-if="activeTab === 'profile'"
        >
          <div class="inputs">
            <div class="section">
                <h2>
                  Organization
                </h2>
              <div class="field">
                <label for="">Name:</label>
                <input
                  v-model="Organization.name"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Phone Number:</label>
                <input
                  v-model="Organization.phone"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Company Email::</label>
                <input
                  v-model="Organization.email"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Website:</label>
                <input
                  v-model="Organization.website"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Address:</label>
                <input
                  v-model="Organization.location.addressLine1"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">City:</label>
                <input
                  v-model="Organization.location.city"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">State:</label>
                <input
                  v-model="Organization.location.state"
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Zipcode:</label>
                <input
                  v-model="Organization.location.zipcode"
                  type="text"
                  placeholder="">
              </div>
            </div>
            <div class="section">
                <h2>
                  Primary Contact
                </h2>
              <div class="field">
                <label for="">Name:</label>
                <input
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Phone:</label>
                <input
                  type="text"
                  placeholder="">
              </div>
              <div class="field">
                <label for="">Email Address:</label>
                <input
                  type="text"
                  placeholder="">
              </div>
              <div class="buttonsRow">
                <button class="_button1" @click.prevent='update()'>Save Changes</button>
                <button
                  class="_button3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <!-- ------------------------------ Profile Panel ------------------------------------ -->
        <div
            class="panel"
            v-if="activeTab === 'personnel'"
        >
          <personnel></personnel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Personnel from '../modules/Personnel'
import { GET_USER_QUERY } from '../../../constants/graphql/users'
import { GET_ORGANIZATION_QUERY, UPDATE_ORGANIZATION_MUTATION } from '../../../constants/graphql/organizations'
import { CREATE_LOCATION_MUTATION } from '../../../constants/graphql/locations'
import moment from 'moment'
import { format, differenceInMinutes } from 'date-fns'

export default {
  name: 'ProfilePage',
  components: {
    Personnel
  },
  data () {
    return {
      keyword: '',
      userId: this.$store.state.auth.user.id,
      User: {},
      activeTab: 'profile',
      organizationId: this.$route.params.id,
      Organization: {
        location: {
          addressLine1: '',
          city: '',
          state: '',
          zipcode: ''
        }
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
        // Creates clone of data because Apollo query data is read only
        this.User = JSON.parse(JSON.stringify(data.User))
      }
    },
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.organizationId
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo query data is read only
        this.Organization = JSON.parse(JSON.stringify(data.Organization))
        // Initialize location object if one has not yet been created for the Organization
        if (!this.Organization.location) {
          this.Organization.location = {
            addressLine1: '',
            city: '',
            state: '',
            zipcode: ''
          }
        }
      }
    }
  },
  filters: {
    ago (time) {
      return moment(time).fromNow()
    },
    formatDate (data) {
      return format(data, 'MM/DD/YY')
    },
    formatTime (data) {
      return format(data, 'hh:mma')
    }
  },
  computed: {
    modalState () {
      return this.$store.state.showCreateVolunteeringLog
    }
  },
  methods: {
    getDate (startTime, endTime) {
      return `${format(startTime, 'MM/DD/YY')}   \u00A0 ${format(endTime, 'MM/DD/YY')}`
    },
    calculateHours (obj) {
      // console.log('time', obj.endTime, obj.startTime, differenceInMinutes(obj.endTime, obj.startTime))
      return (parseFloat(differenceInMinutes(obj.endTime, obj.startTime)) / 60).toPrecision(1)
    },
    toggleCreateVolunteeringLog () {
      // console.log('button pushed')
      this.$store.commit('toggleCreateVolunteeringLog')
    },
    toggleUpdateVolunteeringLog (obj) {
      // console.log('button pushed')
      this.$store.commit('updateCurrentVolunteeringLog', obj)
      this.$store.commit('toggleUpdateVolunteeringLog')
    },
    isActiveTab (data) {
      this.activeTab = data
      return this.activeTab
    },
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    update () {
      console.log('Organization', this.Organization)
      // Checks to see if the organization has a Location object associated with it yet
      // Organization.location.id will only exist if a Location object exists in db this protects the data
      // initialization from tripping this statement
      if (!this.Organization.location.id && (this.Organization.location.addressLine1 ||
      this.Organization.location.city || this.Organization.location.state || this.Organization.location.zipcode)) {
        console.log('Has location')
        this.$apollo.mutate({
          mutation: CREATE_LOCATION_MUTATION,
          variables: {
            organizationId: this.Organization.id,
            addressLine1: this.Organization.location.addressLine1,
            city: this.Organization.location.city,
            state: this.Organization.location.state,
            zipcode: this.Organization.location.zipcode
          }
        }).catch((error) => {
          console.log(error)
        }).then((data) => {
          console.log('Location Created', data)
        })
      } else {
        console.log('No location')
        this.$apollo.mutate({
          mutation: UPDATE_ORGANIZATION_MUTATION,
          variables: {
            id: this.Organization.id,
            name: this.Organization.name,
            phone: this.Organization.phone,
            email: this.Organization.email,
            website: this.Organization.website,
            addressLine1: this.Organization.location.addressLine1,
            city: this.Organization.location.city,
            state: this.Organization.location.state,
            zipcode: this.Organization.location.zipcode
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pageLayout {
  display: grid;
  // ####### GRID ######
  // Profile Header
  // Tabs
  // Tab Panels
  grid-template-columns: 100%;
  grid-template-rows: 25vh auto auto;
  background-color: white;
  padding: 3%;
}
.section {
  margin-bottom: 3vh;
}
.profileHeader {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 28% 18% 18% 18% 4vh;
  font-size: 2vh;
  margin-bottom: 5vh;
  .user-name {
    font-size: 3vh;
  }
  .headerButton {
    width: 25%;
  }
}
.profileImage {
  height: 20vh;
  width: 20vh;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: -1;
  background-color: lightgray;
  border-radius: 10vh;
}
.tabs {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
}
.tab {
  border: .1vh solid black;
  border-bottom: none;
  padding: 1vh;
  font-size: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  margin-right: 0.25vw;
  background-color: var(--theme-color5);
  cursor: pointer;
}
.tab:hover {
  color: var(--theme-color1);
}
.active-tab {
  background-color:white;
  border-bottom: none;
  color: var(--theme-color1);
  cursor: pointer;
  margin-bottom: -1px;
  z-index: 1;
}
.active-tab:hover {
  cursor: pointer;
}
.panel {
  margin: auto;
  border: .15vh solid black;
  padding: 5vh;
  z-index: -1;
}
.field {
  width: 100%;
  margin-top: 3vh;
}
label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 98%;
  padding-left: 1vw;
  font-size: 2vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
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
  }
}
.volunteer-logging-panel {
  display: grid;
  grid-template-rows: 5vh auto;
  button {
    height: 5vh;
    width: 15vw;
  }
}
.table {
  /* border-collapse is needed to make the borders work properly on rows */
  margin-top: 1%;
  border-collapse: collapse;
  border-bottom: 2px solid lightgray;
  border-radius: 3px;
  background-color: white;
  width: 100%;
  button {
    width: 5vw;
    // background-color: blue;
  }
  .edit-button {
    width: 2vw;
  }
  .align-right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
}
.table-header {
  padding: 1vh;
  display: grid;
  grid-template-columns: 35% 30% 25% 10%;
  height: auto;
  background-color: var(--theme-color3);
  color: white;
}
.border {
  border: 1px solid red;
}
.table-row {
  display: grid;
  grid-template-columns: 35% 30% 25% 10%;
  grid-template-rows: 3vh 7vh;
  padding: 1vh;
  overflow: hidden;
  // min-height: 10vh;
  border-bottom: 1px solid lightgray;
  .title {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    width: 100%;
    // border: 1px solid red;
  }
  .description {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 1.8vh;
  }
  .location {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: -1;
    font-size: 2vh;
  }
  .date-time {
    font-size: 2vh;
  }
  button {
    height: 2vh;
    width: 3vw;
    margin-top: 5vh;
    background-color: var(--theme-color1);
    border-radius: 2vh;
  }
}
.table-row:hover {
  background-color: rgb(245, 245, 245);
}

</style>
