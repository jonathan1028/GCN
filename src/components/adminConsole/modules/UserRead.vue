<template>
  <div class="page">
    <div class="field">
      <h1>{{`${user.firstName} ${user.lastName}`}}</h1>
    </div>
    <div class="field">
      <label for="">Email:</label>
      <div>{{user.email}}</div>
    </div>
    <div class="field">
      <label for="">Phone:</label>
      <div>{{user.phone}}</div>
    </div>
    <div class="field">
      <label for="">Preferences:&nbsp;</label>
      <div>{{user.preferences}}</div>
    </div>
    <div class="field">
      <label for="">Responses:&nbsp;</label>
      <div>{{user.responses.length}}</div>
    </div>
    <div class="field">
      <label for="">Volunteering Logs:&nbsp;</label>
      <div>{{user.volunteeringLogs.length}}</div>
    </div>
    <div class="field">
      <label for="">Notifications:&nbsp;</label>
      <div>{{user.notifications.length}}</div>
    </div>
    <div class="field">
      <label for="">Medallions:&nbsp;</label>
      <div>{{user.medallions.length}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadUser',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.id = this.$route.params.id
    console.log('User', this.user, this.id)
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 3vh;
  background-color: white;
}
.field {
  display: flex;
  align-items: flex-end
}
</style>
