<template>
  <div class="page">
    <h1>My Volunteers</h1>
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

export default {
  name: 'MyVolunteersPage',
  components: {
    BaseTable
  },
  data () {
    return {
      query: [],
      Organization: {},
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'firstName', title: 'first name'},
        {dbField: 'lastName', title: 'last name'},
        {dbField: 'phone', title: 'phone'},
        {dbField: 'email', title: 'email'}]
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
        this.query = data.Organization.volunteers
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
