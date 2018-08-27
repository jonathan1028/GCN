<template>
  <div class="feedPageLayout">
    <div class="_box">Left Column</div>
    <div class="_box">
        <div>
          <span
            class="searchBlock _box"
            v-if="activeModal === null"
          >
            <form class="search">
              <input name="query" v-model="searchQuery" placeholder="Search">
            </form>
            <button @click="updateActiveModal('create')">
              Create New Opportunity
            </button>
          </span>
          <div>
            <span v-if="this.$store.state.activeModal === 'create'">
              <create-opportunity></create-opportunity>
            </span>
          </div>
          <div>
            <span v-if="this.$store.state.activeModal === 'update'">
              <update-opportunity></update-opportunity>
            </span>
          </div>
          <my-opportunities
            :data="allOpportunities"
            :columns="columns"
            :searchQuery="searchQuery">
          </my-opportunities>
        </div>
    </div>
    <div class="_box">Right Column</div>
  </div>
</template>

<script>
// import Feed from './Feed'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
import CreateOpportunity from './CreateOpportunity'
import UpdateOpportunity from './UpdateOpportunity'
import MyOpportunities from './MyOpportunities'

export default {
  name: 'MyOpportunitiesPage',
  components: {
    CreateOpportunity, UpdateOpportunity, MyOpportunities
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      allOpportunities: [
        {name: 'Opp1'},
        {name: 'Opp2'},
        {name: 'Opp3'}
      ],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'Name'},
        {dbField: 'description', title: 'description'},
        {dbField: 'startTime', title: 'Start Time'},
        {dbField: 'endTime', title: 'End Time'},
        {dbField: 'address', title: 'Location'}
      ],
      activeModal: this.$store.state.activeModal
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
    }
  },
  methods: {
    updateActiveModal (data) {
      console.log('Test', data)
      this.$store.commit('updateActiveModal', data)
    },
    openCreate () {
      this.$store.commit('toggleCreateOpportunity')
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
.searchBlock {
  display: flex;
  justify-content: space-between;
  padding: 1%;
}
.search {
  height: 4vh;
  // padding: 1%;
  input {
    width: 25vw;
    height: 4vh;
    font-size: 2.5vh;
    color: var(--text-color1);
  }
}
.feedPageLayout {
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 15vw 50vw 15vw;
  grid-column-gap: 3vw;
}
</style>
