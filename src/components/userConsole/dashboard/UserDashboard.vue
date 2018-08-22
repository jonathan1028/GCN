<template>
  <div class="feedPageLayout">
    <div>
      <notifications-box
        class="notifications-component"
      ></notifications-box>
      <search
        class="search-component"
      ></search>
    </div>
    <div>
      <carousel></carousel>
      <feed
        class="feed-component"
        :data="allOpportunities"
        :columns="columns"
      >
      </feed>
    </div>
    <div>
      <button-menu></button-menu>
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
import Carousel from './Carousel'
import ButtonMenu from './ButtonMenu'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'FeedPage',
  components: {
    Feed, Search, NotificationsBox, CreateMedallion, Carousel, ButtonMenu
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
    }
  },
  methods: {
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
     "left-column center-column right-column";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.--no-margin {
  margin-top: 0vh;
}

.feed-component {
  grid-area: feed-component;
}

.create-medallion-component {
  grid-area: center-column;
}

</style>
