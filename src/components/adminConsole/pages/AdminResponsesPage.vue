<template>
  <div class="page">
    <h1>Responses</h1>
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
import { ALL_RESPONSES_QUERY } from '../../../constants/graphql/responses'

export default {
  name: 'AdminResponsesPage',
  components: {
    BaseTable
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'ownedBy', title: 'Name'},
        {dbField: 'type', title: 'Type'},
        {dbField: 'createdAt', title: 'createdAt'}

      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allResponses: {
      query: ALL_RESPONSES_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allResponses
      }
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
