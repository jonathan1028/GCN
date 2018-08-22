<template>
  <div>
    <div class="action-buttons-component _box">
      <div class="__header">Grow the GCN Community</div>
      <div class="__row --border-collapse">
        <button class="_button1 ">Send a Thank You Note</button>
      </div>
      <div class="__row">
        <button class="_button1">Invite Friends</button>
      </div>
      <div class="__row">
        <button
          class="_button1"
          @click="open()"
        >Issue Medallions</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ButtonMenue',
  data () {
    return {
    }
  },
  methods: {
    open () {
      this.$store.commit('toggleCreateMedallionModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.--no-margin {
  margin-top: 0vh;
}

.action-buttons-component{
  grid-area: action-buttons-component;
  display: grid;
  grid-template-rows: 8.8vh repeat(auto-fill, 10vh);
  height: fit-content;
  background-color: white;
  button {
    height: 6vh;
  }
}

.__header {
  // background: rgb(245,245,249);
  // background: linear-gradient(0deg, rgba(245,245,249,1) 0%, rgba(255,255,255,1) 0%, rgba(255,204,0,1) 100%);
  // border-top-right-radius: 3vh;
  // border-top-left-radius: 3vh;
  border-top: .75vh solid var(--background-color1);
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: .3vh solid var(--background-color4);
  border-collapse: collapse;
}
.__row {
  font-size: 1vw;
  border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
}
.--border-collapse {
  border-top: none;
}
.--bottom-row {
  padding-bottom: 2vh;
}
</style>
