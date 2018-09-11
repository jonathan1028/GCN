<template>
  <div class="page">
    <div class="field">
      <h1>{{ Opportunity.name }}</h1>
    </div>
    <div class="field">
      <label for="">Description:</label>
      <div>{{Opportunity.description}}</div>
    </div>
    <div class="field">
      <label for="">Start Time:</label>
      <div>{{Opportunity.startTime}}</div>
    </div>
    <div class="field">
      <label for="">End Time:</label>
      <div>{{Opportunity.endTime}}</div>
    </div>
    <div class="field">
      <label for="">Location:</label>
      <div v-if="Opportunity.location">{{Opportunity.location.name}}</div>
    </div>
    <div class="field">
      <label for="">Created By:</label>
      <div v-if="Opportunity.ownedBy">{{Opportunity.ownedBy.firstName}}</div>
    </div>
    <div class="field">
      <label for="">Responses:</label>
      <!-- <div>{{Opportunity.responses}}</div> -->
    </div>
    <base-table
      :data="Opportunity.responses"
      :columns="columns"
      :filter-key="searchQuery">
    >
    </base-table>
  </div>
</template>

<script>
import BaseTable from '../modules/BaseTable'
import { GET_ORGANIZATION_QUERY } from '../../../constants/graphql/organizations'

export default {
  name: 'ReadUser',
  components: {
    BaseTable
  },
  data () {
    return {
      Opportunity: {},
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'ownedBy', title: 'Name'},
        {dbField: 'type', title: 'Response Type'}
      ]
    }
  },
  apollo: {
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          // By using a reactive variable
          id: this.$store.state.currentOrganization.id
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo query data is read only
        let index = data.Organization.opportunities.findIndex(x => x.id === this.$route.params.id)
        this.Opportunity = JSON.parse(JSON.stringify(data.Organization.opportunities[index]))
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
.field {
  display: flex;
  align-items: flex-end
}
</style>
