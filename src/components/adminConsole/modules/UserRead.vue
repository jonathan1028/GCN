<template>
  <div class="page">
    <div class="field">
      <h1>{{`${this.user.firstName} ${this.user.lastName}`}}</h1>
    </div>
    <div class="field">
      <label for="">Email:</label>
      <div>{{this.user.email}}</div>
    </div>
    <div class="field">
      <label for="">Phone:</label>
      <div>{{this.user.phone}}</div>
    </div>
    <div class="field">
      <label for="">Preferences:&nbsp;</label>
      <div>{{this.user.preferences}}</div>
    </div>
    <div class="field">
      <label for="">Responses:&nbsp;</label>
      <div>{{this.user.responses.length}}</div>
    </div>
    <div class="field">
      <label for="">Volunteering Logs:&nbsp;</label>
      <div>{{this.user.volunteeringLogs.length}}</div>
    </div>
    <div class="field">
      <label for="">Notifications:&nbsp;</label>
      <div>{{this.user.notifications.length}}</div>
    </div>
    <div class="field">
      <label for="">Medallions:&nbsp;</label>
      <div>{{this.user.medallions.length}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadUser',
  beforeCreate () {
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
