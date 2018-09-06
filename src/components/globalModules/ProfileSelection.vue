<template>
  <select
    v-model="selectedProfile.id"
    @change="selectProfile()"
  >
    <option :value="userId">{{userEmail}}</option>
    <option
      v-for="(org, index) in user.organizations"
      :key="index"
      :value="org.id"
      text="org.id"
    >
      {{ org.name }}
    </option>
  </select>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_ORGANIZATION_QUERY } from '../../constants/graphql/organizations'

export default {
  name: 'ProfileSelection',
  data () {
    return {
    }
  },
  apollo: {
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.selectedProfile.id
        }
      }
    }
  },
  computed: {
    ...mapGetters(['authenticated', 'userId', 'userEmail', 'user', 'selectedProfile'])
  },
  methods: {
    selectProfile () {
      if (this.selectedProfile.id !== this.userId) {
        this.$apollo.query({
          query: GET_ORGANIZATION_QUERY,
          variables: {
            id: this.selectedProfile.id
          }
        }).catch((error) => {
          console.error(error)
        }).then((result) => {
          this.$store.commit('updateSelectedProfile', result.data.Organization)
          this.$store.commit('updateCurrentOrganization', result.data.Organization)
          console.log('Result', this.$store.state.currentOrganization)
          // this.$router.replace(`/organization/profile/${this.selected}`)
          this.$router.replace('/organization/myOpportunities')
        })
      } else {
        console.log('User sent to store', this.user)
        this.$store.commit('updateSelectedProfile', this.user)
        this.$router.replace(`/feed`)
      }
    }
  }
}
</script>
