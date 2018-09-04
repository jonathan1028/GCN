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
import { SIGNIN_USER_MUTATION, CREATE_USER_MUTATION, GET_USER_QUERY } from '../../constants/graphql/users'

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
    login (email, password) {
      this.$apollo.mutate({
        mutation: SIGNIN_USER_MUTATION,
        variables: {
          email,
          password
        }
      }).then((result) => {
        if (result.data.signinUser.user.id) {
          this.$store.commit('authenticated', result.data.signinUser)
          console.log('Login succeeded')
          this.$store.commit('authenticated', result.data.signinUser)
          this.$apollo.mutate({
            mutation: CREATE_ORGANIZATION_MUTATION,
            variables: {
              personnelIds: result.data.signinUser.user.id,
              name: this.name
            }
          }).catch((error) => {
            console.error(error)
          }).then((result) => {
            console.log('Org Creation!', result.data.createOrganization)
            this.$router.push({ path: `/organization/profile/${result.data.createOrganization.id}` })
          })
        } else {
          console.log('Incorrect username/password')
        }
      }).catch((error) => {
        alert(error)
      })
    },
    create () {
      let firstName = this.firstName
      let lastName = this.lastName
      let email = this.email
      let password = this.password

      // Lookup User by the email submitted
      this.$apollo.query({
        query: GET_USER_QUERY,
        variables: {
          email: this.email
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        // If email does not exist create User and then Organization
        if (result.data.User === null) {
          console.log('User with this email address cannot be found')
          this.$apollo.mutate({
            mutation: CREATE_USER_MUTATION,
            variables: {
              email: email,
              firstName: firstName,
              lastName: lastName,
              password: password
            }
          }).catch((error) => {
            console.error(error)
          }).then((result) => {
            this.login(email, password)
          })
        } else {
          // If user email was found then authenticate email/password combination
          this.login(email, password)
        }
      })
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
