<template>
  <div class="page">
    <h1>Users</h1>
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
import MedallionsIssuedTable from '../modules/MedallionsIssuedTable'
import { ALL_USERS_QUERY } from '../../../constants/graphql/users'
// import { ALL_PEOPLE_QUERY, NEW_PEOPLE_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'AdminUsersPage',
  components: {
    BaseTable, MedallionsIssuedTable
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'firstName', title: 'first name'},
        {dbField: 'lastName', title: 'last name'},
        {dbField: 'email', title: 'email'},
        {dbField: 'createdAt', title: 'createdAt'},
        {dbField: 'updatedAt', title: 'updatedAt'}]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allUsers: {
      query: ALL_USERS_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allUsers
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
