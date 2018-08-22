<template>
  <div class="notifications-box _box">
    <div class="notifications__header">
      <div class="__userPhoto"></div>
      <div class="__userName">User Name</div>
      <div class="__userLocation">Austin, TX</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('thankYouNotes')"
      >
      <icon
        class="icon"
        name="comment-alt"
      ></icon>
      <div class="notification-label">Thank You Notes:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('follow')"
    >
      <icon
        class="icon"
        name="user-plus"
      ></icon>
      <div class="notification-label">Follow:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('donations')"
    >
      <icon
        class="icon"
        name="hand-holding-usd"
      ></icon>
      <div class="notification-label">Donations:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('volunteer')"
    >
      <icon
        class="icon"
        name="hands-helping"
      ></icon>
      <div class="notification-label">Volunteer:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('support')"
    >
      <icon
        class="icon"
        name="medkit"
      ></icon>
      <div class="notification-label">Support:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('interested')"
    >
      <icon
        class="icon"
        name="heart"
      ></icon>
      <div class="notification-label">Interested:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('going')"
    >
      <icon
        class="icon"
        name="hourglass"
      ></icon>
      <div class="notification-label">Going:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('recognitions')"
    >
      <icon
        class="icon"
        name="trophy"
      ></icon>
      <div class="notification-label">Recognitions:</div>
      <div class="count">0</div>
    </div>
    <div
      class="notifications__row"
      @click="redirect('share')"
    >
      <icon
        class="icon"
        name="paper-plane"
      ></icon>
      <div class="notification-label">Share:</div>
      <div class="count">0</div>
    </div>
    <div class="notifications__row --bottom-row">
      <a>See all notifications...</a>
    </div>
  </div>
</template>

<script>
// import Feed from './Feed'
// import Search from './Search'
// import NotificationsBox from './NotificationsBox'
// import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'NotificationsBox',
  data () {
    return {
    }
  },
  methods: {
    redirect (notificationType) {
      this.$store.commit('updateNotificationType', notificationType)
      this.$router.push('notifications')
    }
  }
}
</script>

<style lang="scss" scoped>
.notifications-box {
  // width: 100%;
  height: 50vh;
  top: 0;
  margin: 0vh;
  padding: 0vh;
  display: grid;
  // grid-template-rows: 8vh repeat(10, 4vh);
  align-content: start;
}
.notifications__header {
  // background: rgb(245,245,249);
  // background: linear-gradient(0deg, rgba(245,245,249,1) 0%, rgba(255,255,255,1) 0%, rgba(255,204,0,1) 100%);
  // border-top-right-radius: 3vh;
  // border-top-left-radius: 3vh;
  height: 8vh;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  border-bottom: .3vh solid var(--background-color4);
  border-top: .75vh solid var(--background-color1);
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "user-photo user-name"
    "user-photo user-location";
  padding: 0.8vh 0vh 0vh 3vh;
}
.__userPhoto{
  width: 6vh;
  height: 6vh;
  grid-area: user-photo;
  background-color: white;
  border: .15vh solid var(--theme-color3);
  border-radius: 3vh;
}
.__userName {
  grid-area: user-name;
  text-align: left;
}
.__userLocation {
  grid-area: user-location;
  font-size: 1.5vh;
  text-align: left;
}
.notifications__row {
  font-size: 1vw;
  // border: .3vh solid var(--theme-color4);
  padding: 0.5vh 2vw;
  display: flex;
  align-content: center;
  cursor: pointer;
  .notification-label {
    font-weight: 100;
    color: var(--theme-color3);
    // color: blue;
  }
  .icon {
    margin-top: 0.5vh;
    margin-right: 2vh;
  }
  .count {
    margin-left: .5vw;
    font-weight: 900;
  }
}
.__row {
  font-size: 1vw;
  border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
}
.--bottom-row {
  padding-bottom: 2vh;
}
</style>
