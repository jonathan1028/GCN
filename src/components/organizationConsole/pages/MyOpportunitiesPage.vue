<template>
  <div class="page">
    <!------------------------------------------       Modals ------------------------------------ -->
      <div class="modal-area">
        <span v-if="this.$store.state.activeModal === 'create'">
          <opportunity-create></opportunity-create>
        </span>
        <span v-if="this.$store.state.activeModal === 'update'">
          <opportunity-update></opportunity-update>
        </span>
      </div>
    <!------------------------------------------ Create Volunteering Log Modal ------------ -->
    <h1>My Opportunities</h1>
    <div>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <base-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery">
      </base-table>
    </div>
  </div>
</template>

<script>
import BaseTable from '../modules/BaseTable'
// import { ALL_USERS_QUERY } from '../../../constants/graphql/users'
import { GET_ORGANIZATION_QUERY } from '../../../constants/graphql/organizations'
import OpportunityCreate from '../modules/OpportunityCreate'
import OpportunityUpdate from '../modules/OpportunityUpdate'

export default {
  name: 'MyOpportunitiesPage',
  components: {
    BaseTable, OpportunityCreate, OpportunityUpdate
  },
  data () {
    return {
      activeModal: this.$store.state.activeModal,
      query: [],
      allOpportunities: [
        {name: 'Opp1'},
        {name: 'Opp2'},
        {name: 'Opp3'}
      ],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'name'},
        {dbField: 'description', title: 'decription'},
        {dbField: 'startTime', title: 'start time'},
        {dbField: 'endTime', title: 'end time'},
        {dbField: 'location', title: 'location'}]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    // allUsers: {
    //   query: ALL_USERS_QUERY,
    //   result ({ data }) {
    //     // Sets variable query to the gql data for a more modular UI template
    //     this.query = data.allUsers
    //   }
    // },
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      variables () {
        return {
          // By using a reactive variable
          id: this.$store.state.currentOrganization.id
        }
      },
      result ({ data }) {
        console.log('Organization', data.Organization)
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.Organization.opportunities
      }
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
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 3vh;
  background-color: white;
}
.search{
  width: 38%;
}
.adminPage {
  margin: 0vh 5vw;
}
</style>
