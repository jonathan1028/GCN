<template>
    <div class="pageLayout">
      <notifications-box></notifications-box>
      <div class="notifications">
        <ul>
          <li
            class="notification _box-shadow1"
            v-for='(item, index) in allNotifications'
            :key='index'
          >
            <icon
              class="icon"
              name="heart"
            ></icon>
            <div class="message">{{item.message}}</div>
            <div class="time-stamp">{{item.createdAt | formatDate}}</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { ALL_NOTIFICATIONS_QUERY } from '../../../constants/graphql'
import NotificationsBox from '../modules/NotificationsBox'
import { format } from 'date-fns'
console.log('UserId', localStorage.getItem('graphcool-user-id'))

export default {
  name: 'NotificationsPage',
  components: {
    NotificationsBox
  },
  data () {
    console.log('NotificationType', this.$store.state.notificationType)
    return {
      allNotifications: []
    }
  },
  filters: {
    formatDate (data) {
      return format(data, 'MMMM Do YYYY, h:mm:ssa')
    }
  },
  apollo: {
    allNotifications: {
      query: ALL_NOTIFICATIONS_QUERY
    }
  }
}
</script>

<style lang="scss" scoped>
.pageLayout {
  // padding: 0vh;
  // background-color: pink;
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.notifications {
  background-color: white;
  padding: 3vh;
}
.notification {
  display: grid;
  grid-template-columns: 5% 65% 30%;
  grid-template-rows: 5vh;
  grid-template-areas:
    "icon message time-stamp";
  padding: 2vh;
  margin-bottom: 3vh;
}
.icon {
  grid-area: icon;
  // border: 1px solid #555;
  color: var(--theme-color3);
}
.message {
  // grid-area: message;
  // border: 1px solid #555;
  font-size: 2vh;
  color: var(--theme-color3);
}
.time-stamp {
  grid-area: time-stamp;
  // border: 1px solid #555;
  font-size: 1.8vh;
  color: var(--theme-color4);
  overflow: hidden;
}
</style>
