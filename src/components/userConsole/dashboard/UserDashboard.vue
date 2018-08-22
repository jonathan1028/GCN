<template>
  <div class="feedPageLayout">
    <notifications-box
      class="notifications-component"
    ></notifications-box>
    <search
      class="search-component"
    ></search>
    <div class="carousel-component _box">
      <div class="__header">Help people affected by Hurricane Harvey</div>
      <div class="__image-row">Photos</div>
      <div class="__card-row">
        <div class="__volunteer-card _box-shadow1">
          <div class="__card-header">Volunteer</div>
          <div class="__card-item1 --no-margin">
            <div>Icon</div>
            <div>
              Serve meals and snacks with our partners
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Open up your home to families in need
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Learn how you can be a support contact
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Use your truck for good
            </div>
          </div>
          <div class="__card-footer1">
            <button class="_button3">More Ways to Help</button>
          </div>
        </div>
        <div class="__support-card _box-shadow1">
          <div class="__card-header">Support</div>
          <div class="__card-item2 --no-margin">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Cleaning Supplies
            </div>
          </div>
          <div class="__card-item2 --no-margin">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Diapers
            </div>
          </div>
          <div class="__card-item2">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Coolers
            </div>
          </div>
          <div class="__card-item2">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Comfort Kits
            </div>
          </div>
          <div class="__card-footer2">
            <button class="_button3">Donate Goods</button>
          </div>
        </div>
        <div class="__donate-card _box-shadow1">
          <div class="__card-header">Donate</div>
          <div class="__card-item3 --no-margin">$500</div>
          <div class="__card-item3">$100</div>
          <div class="__card-item3">$50</div>
          <div class="__card-item3">$25</div>
          <div class="__card-footer1">
            <button class="_button3">Donate $</button>
          </div>
        </div>
      </div>
      <div class="__carousel-footer"> ...... </div>
    </div>
    <feed
      class="feed-component"
      :data="allOpportunities"
      :columns="columns"
    >
    </feed>
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
    <!------------------------------------------ Modal- Create Medallion  ------------------------- -->
      <span v-if="this.$store.state.showCreateMedallionModal">
        <create-medallion
          class="create-medallion-component"
        ></create-medallion>
      </span>
    <!------------------------------------------ End of Modal Content  ---------------------------- -->
  </div>
</template>

<script>
import Feed from './Feed'
import Search from './Search'
import CreateMedallion from './CreateMedallion'
import NotificationsBox from './NotificationsBox'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'FeedPage',
  components: {
    Feed, Search, NotificationsBox, CreateMedallion
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      // showCreateMedallionModal: this.$store.showCreateMedallionModal
      allOpportunities: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'Name'},
        {dbField: 'description', title: 'description'},
        {dbField: 'startTime', title: 'Start Time'},
        {dbField: 'endTime', title: 'End Time'},
        {dbField: 'address', title: 'Location'}
      ]
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
    }
  },
  methods: {
    open () {
      this.$store.commit('toggleCreateMedallionModal')
    }
    // processData (data) {
    //   console.log(data)
    //   return data
    // }
  // }
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY
    }
  }
}
</script>

<style lang="scss" scoped>
.feedPageLayout {
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-template-areas:
     "notifications-component carousel-component action-buttons-component"
     "search-component        feed-component     .";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.carousel-component {
  grid-area: carousel-component;
  // width: 100%;
  height: 65vh;
  background-color: white;
  display: grid;
  grid-template-rows: 4vh 6fr 10fr 1fr
}
.__image-row {
  font-size: 1vw;
  // border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
  margin: 1vh 1.5vh;
  background-color: var(--theme-color4);
}
.__card-row {
  font-size: 1vw;
  margin: 0vh 1.5vh 1.5vh 2vh;
  // background-color: var(--theme-color4);
  display: grid;
  grid-template-columns: 38% 38% 20%;
  grid-column-gap: 2%;
}
.__volunteer-card {
  border-radius: 3vh;
  display: grid;
  grid-template-rows: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-template-columns: 1fr;
  grid-row-gap: 1vh;
  padding: 1vh 1vh;
}
.__support-card {
  border-radius: 3vh;
  display: grid;
  display: grid;
  grid-template-rows: 1fr 2fr 2fr 1fr;
  grid-template-columns: 48% 48%;
  grid-column-gap: 1vh;
  grid-row-gap: 1vh;
  padding: 0.5vh 1vh 1vh 1vh;
}
.__donate-card {
  border-radius: 3vh;
  display: grid;
  grid-template-rows: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-template-columns: 1fr;
  grid-row-gap: 1vh;
  padding: 1vh 1vh;
}
.__card-header {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: .15vh solid var(--theme-color4);
}
.__card-footer1 {
  grid-row-start: 6;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0% 15%;
  button {
    height: 100%;
  }
  // border: 1px solid black;
}
.__card-footer2 {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0% 15%;
  button {
    height: 100%;
  }
  // border: 1px solid black;
}
.__card-item1 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  // margin-top: 4%;
}
.__card-item2 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: grid;
  grid-template-rows: 60% 40%;
  // margin-top: 4%;
}
.__card-item3 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 4%;
}
.__card-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.__card-item-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.--no-margin {
  margin-top: 0vh;
}
.__carousel-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid black;
}
.feed-component {
  grid-area: feed-component;
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
.create-medallion-component {
  grid-area: carousel-component;
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
