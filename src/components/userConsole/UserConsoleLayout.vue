<template>
  <div class="userConsoleLayout">
    <div class="header">
      <div class="header-content">
          <div class="main-nav">
            <!-- Logo -->
            <div class="logo">GCN</div>
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
              <!-- Logged in navigation -->
              <!-- <div class="authenticated-nav" v-if="userId">
                <router-link to="/people">People</router-link>
                <div>|</div>
                <router-link to="/opportunities">Opportunities</router-link>
                <div>|</div>
              </div>
              <router-link to="/admin">Admin Panel</router-link>
              <div>|</div>
              <router-link to="/newusers">New User Accounts</router-link> -->
            </div>
          </div>
          <!-- Login buttons   -->
          <div>
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
  name: 'AppHeader',
  components: {
    ProfileSelection
  },
  data () {
    console.log('Test', this.$store.state.auth.user.id)
    return {
      selected: 'userEmail'
      // selected: this.$store.state.auth.user.id
    }
  },
  computed: mapGetters(['authenticated', 'userId', 'userEmail', 'user']),
  methods: {
    ...mapActions(['logout']),
    selectProfile () {
      console.log('Selected', this.selected)
      if (this.selected !== this.userEmail) {
        this.$router.push({ path: `/organization/profile/${this.selected}` })
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
