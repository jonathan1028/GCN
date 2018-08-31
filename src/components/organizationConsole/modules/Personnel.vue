<template>
  <div class="page">
    <h1>Personnel</h1>
    <div>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <base-table
        :data="Organization.personnel"
        :columns="columns"
        :filter-key="searchQuery">
      </base-table>
    </div>
  </div>
</template>

<script>
import BaseTable from '../modules/BaseTable'
import { GET_ORGANIZATION_QUERY } from '../../../constants/graphql/organizations'

export default {
  name: 'Personnel',
  components: {
    BaseTable
  },
  data () {
    return {
      organizationId: JSON.parse(localStorage.getItem('organization')).id,
      Organization: {},
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'firstName', title: 'First Name'},
        {dbField: 'lastName', title: 'Last Name'},
        {dbField: 'role', title: 'Role'}
      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.organizationId
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo query data is read only
        this.Organization = JSON.parse(JSON.stringify(data.Organization))
        // Initialize location object if one has not yet been created for the Organization
        if (!this.Organization.location) {
          this.Organization.location = {
            addressLine1: '',
            city: '',
            state: '',
            zipcode: ''
          }
        }
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
