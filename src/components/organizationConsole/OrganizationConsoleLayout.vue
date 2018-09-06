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
              <router-link :to="{path: '/organization/profile/:id', params: {id: selectedProfile.id}}">Profile</router-link>
              <div>|</div>
              <router-link to="/organization/myopportunities">My Opportunities</router-link>
              <div>|</div>
              <router-link to="/admin/dashboard">Admin</router-link>
            </div>
          </div>
          <!-- Login buttons   -->
          <div class="right-side-links">
            <profile-selection></profile-selection>
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
import ProfileSelection from '../globalModules/ProfileSelection'

export default {
  name: 'OrganizationsConsoleHeader',
  components: {
    ProfileSelection
  },
  data () {
    return {
    }
  },
  computed: mapGetters(['authenticated', 'userId', 'userEmail', 'user', 'selectedProfile']),
  methods: {
    ...mapActions(['logout'])
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
