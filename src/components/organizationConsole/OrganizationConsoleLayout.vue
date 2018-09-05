<template>
  <div class="userConsoleLayout">
    <div class="header">
      <div class="header-content">
          <div class="main-nav">
            <!-- Logo -->
            <div class="logo">GCN - Organizations</div>
            <div class="nav-buttons">
              <router-link to="/feed">Feed</router-link>
              <div>|</div>
              <router-link to="/notifications">Notifications</router-link>
              <div>|</div>
              <router-link to="/profile">Profile</router-link>
              <div>|</div>
              <router-link to="/myopportunities">My Opportunities</router-link>
              <div>|</div>
              <router-link to="/admin/dashboard">Admin</router-link>
            </div>
          </div>
          <!-- Login buttons   -->
          <div class="right-side-links">
            <select
              v-model="selected"
              @change="selectProfile()"
            >
              <option value="userEmail">{{userEmail}}</option>
              <option
                v-for="(org, index) in user.organizations"
                :key="index"
                :value="org.id"
                text="org.id"
              >
                {{ org.name }}
              </option>
            </select>
            <div
              v-if="authenticated"
              class="link"
              @click="logout()">
                Log Out
            </div>
          </div>
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_ORGANIZATION_QUERY } from '../../constants/graphql/organizations'

export default {

  name: 'OrganizationsConsoleHeader',
  data () {
    console.log('Test', this.$store.state.auth.user.id)
    return {
      selected: 'userEmail'
    }
  },
  apollo: {
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.selected
        }
      }
    }
  },
  computed: mapGetters(['authenticated', 'userId', 'userEmail', 'user']),
  methods: {
    ...mapActions(['logout']),
    selectProfile () {
      console.log('Selected', this.selected)
      if (this.selected !== this.userEmail) {
        console.log('Path', `/organization/profile/${this.selected}`)
        console.log(this.$apollo.queries)
        // this.$apollo.queries.Organization.refetch({
        //   variables: {
        //     id: this.selected
        //   }
        // })
        this.$apollo.query({
          query: GET_ORGANIZATION_QUERY,
          variables: {
            id: this.selected
          }
        }).catch((error) => {
          console.error(error)
        }).then((result) => {
          this.$store.commit('updateCurrentOrganization', result.data.Organization)
          console.log('Result', this.$store.state.currentOrganization)
          this.$router.replace(`/organization/profile/${this.selected}`)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userConsoleLayout {
  display: grid;
  grid-template-rows: 8vh auto;
}
.main-content {
  margin-top: 8vh;
}
.header{
  // position: fixed;
  width: 100%;
  background: white;
  // background: linear-gradient(0deg, rgba(245,245,249,1) 0%, rgba(255,255,255,1) 0%, rgba(255,204,0,1) 100%);
  margin-bottom: 2vh;
  // -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  // -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(245, 245, 245, 0.1) inset;
}
.header-content{
  max-width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  margin-right: 1em;
}
.main-nav{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-buttons{
  display: flex;
  justify-content:space-between;
  align-items: center;
  color: var(--theme-color3);
  cursor: pointer;
  text-decoration: none;
}

.nav-buttons a{
  color: var(--theme-color3);
  text-decoration: none;
}

.nav-buttons a:visited{
  color: var(--theme-color3);
  text-decoration: none;
}

.nav-buttons a:hover{
  color: gray;
  text-decoration: none;
}

.right-side-links{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login a{
   color: var(--theme-color3);
   text-decoration: none;
}

.login a:visited{
  color: var(--theme-color3);
  text-decoration: none;
}

.login a:hover{
  color: gray;
}
.link {
  color: var(--theme-color3);
  text-decoration: none;
  cursor: pointer;
}

</style>
