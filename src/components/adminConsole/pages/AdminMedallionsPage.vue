<template>
  <div class="page">
    <h1>Medallions</h1>
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
import { ALL_MEDALLIONS_QUERY } from '../../../constants/graphql/medallions'

export default {
  name: 'AdminMedallionsPage',
  components: {
    BaseTable
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'id', title: 'id'},
        {dbField: 'createdAt', title: 'createdAt'}
      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allMedallions: {
      query: ALL_MEDALLIONS_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allMedallions
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
