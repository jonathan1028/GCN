<template>
  <div class="adminPage">
    <div class="_box effect6">
      <div class="_box-content">
        <h1>Users</h1>
        <div>
          <form class="search">
            <input name="query" v-model="searchQuery" placeholder="Search">
          </form>
          <user-table
            :data="getData(allUsers)"
            :columns="columns"
            :filter-key="searchQuery">
          </user-table>
        </div>
      </div>
      <medallions-issued-table></medallions-issued-table>
    </div>
  </div>
</template>

<script>
import UserTable from './UserTable'
import MedallionsIssuedTable from './MedallionsIssuedTable'
import { ALL_USERS_QUERY } from '../../constants/graphql'
// import { ALL_PEOPLE_QUERY, NEW_PEOPLE_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'Admin',
  components: {
    UserTable, MedallionsIssuedTable
  },
  data () {
    return {
      allUsers: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'id', title: 'id'},
        {dbField: 'firstName', title: 'first name'},
        {dbField: 'lastName', title: 'last name'},
        {dbField: 'email', title: 'email'},
        {dbField: 'createdAt', title: 'createdAt'},
        {dbField: 'updatedAt', title: 'updatedAt'}]
    }
  },
  methods: {
    getData (data) {
      console.log('Users', data)
      return data
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allUsers: {
      query: ALL_USERS_QUERY
    }
  }
}
</script>

<style>
.search{
  width: 38%;
}
.adminPage {
  margin: 0vh 5vw;
}
</style>
