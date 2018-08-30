<template>
  <div class="component">
    <div class="companyName">Organization Sign Up</div>
    <div class="inputs">
      <div class="field">
        <label for="">Organization Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Organization Name">
      </div>
      <div>Primary Contact</div>
      <div class="field">
        <label for="">First Name</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Good">
      </div>
      <div class="field">
        <label for="">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Citizen">
      </div>
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="email"
          type="text"
          placeholder="Email">
      </div>
      <div class="field">
        <label for="">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div>
      <button
        @click="create()"
        class="_button1"
      >
        Sign Up
      </button>
    </div>
    <div class="linkBlock">
      <router-link
        class="link"
        to="login"
      >
        Already have an account? Login
      </router-link>
    </div>
  </div>
</template>

<script>
import { CREATE_ORGANIZATION_MUTATION } from '../../constants/graphql/organizations'

export default {
  name: 'OrganizationSignUpPage',
  data () {
    return {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    create () {
      this.$apollo.mutate({
        mutation: CREATE_ORGANIZATION_MUTATION,
        variables: {
          name: this.name
        }
        // update: (store, { data: { createVolunteeringLog } }) => {
        //   // Pull data from the stored query
        //   const data = store.readQuery({ query: ALL_VOLUNTEERING_LOGS_QUERY })
        //   // We add the new data
        //   data.allVolunteeringLogs.push(createVolunteeringLog)
        //   // We update the cache
        //   store.writeQuery({ query: ALL_VOLUNTEERING_LOGS_QUERY, data: data })
        // }
      }).catch((error) => {
        console.error(error)
      }).then((data) => {
        console.log('Org Creation!', data)
      })
      // this.$store.dispatch('createUser',
      //   {
      //     email: this.email,
      //     firstName: this.firstName,
      //     lastName: this.lastName,
      //     password: this.password
      //   }
      // )
    }
  }
}
</script>

<style lang="scss" scoped>
.component {
  width: 25vw;
  background-color: var(--background-color2);
  // height: 40vh;
  margin: auto;
  margin-top: 8vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.companyName {
  margin-top: 8vh;
  margin-bottom: 5vh;
  color: var(--font-color1);
  font-size: 4vh;
}
.inputs {
  // margin-top: 5vh;
}
.field {
  width: 100%;
  margin-bottom: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  color: var(--font-color3);
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 100%;
  font-size: 2vh;
  // margin-top: 5vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// button {
//   width: 100%;
//   margin-top: 5vh;
//   background-color: #efba34;
//   border-radius: 3vh;
// }
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
</style>
