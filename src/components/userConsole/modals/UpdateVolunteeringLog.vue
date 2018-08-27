<template>
  <div class="modal _box-shadow">
    <div class="modal-header">
      <h2>Add Volunteering Hours</h2>
    </div>
    <div class="modal-body">
      <form action="">
        <div class="field">
          <label for="">Title:</label>
          <input
            v-model="log.title"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Start Time:</label>
          <flat-pickr
            v-model="log.startTime"
            :config="config"
          ></flat-pickr>
        </div>
        <div class="field">
          <label for="">End Time:</label>
          <flat-pickr
            v-model="log.endTime"
            :config="config"
          ></flat-pickr>
        </div>
        <div class="field">
          <label for="">Location:</label>
          <input
            v-model="log.location"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Description:</label>
          <input
            v-model="log.description"
            type="text"
            placeholder="">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="_button1"
        @click="update()"
      >
        Update
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
// import { CREATE_PERSON_MUTATION } from '../constants/graphql'
import { UPDATE_VOLUNTEERING_LOG_MUTATION, ALL_VOLUNTEERING_LOGS_QUERY } from '../../../constants/graphql'
import { GC_USER_ID } from '../../../constants/settings'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
// import { format } from 'date-fns'

export default {
  name: 'UpdateVolunteeringLog',
  components: { Datepicker, flatPickr },
  data () {
    return {
      log: this.$store.state.currentVolunteeringLog,
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
        // locale: Hindi // locale for this instance only
      }
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleUpdateVolunteeringLog')
    },
    update () {
      // Checks permissions
      const currentUser = localStorage.getItem(GC_USER_ID)
      if (!currentUser) {
        console.error('No user logged in')
        return
      }
      this.$apollo.mutate({
        mutation: UPDATE_VOLUNTEERING_LOG_MUTATION,
        variables: {
          id: this.log.id,
          ownedById: currentUser,
          title: this.log.title,
          description: this.log.description,
          location: this.log.location,
          startTime: this.log.startTime,
          endTime: this.log.endTime
        },
        update: (store, { data: { updateVolunteeringLog } }) => {
          store.writeQuery({ query: ALL_VOLUNTEERING_LOGS_QUERY, data: updateVolunteeringLog })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleUpdateVolunteeringLog')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    //left: 0;
    top: 20vh;
    width: auto; /* Full width */
    height: auto; /* Full height */
    margin: auto;
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
