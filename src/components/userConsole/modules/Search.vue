Component Documentation
V1
X Collect the search query
X Pass the query to Vuex
- In the Feed component, pull the searchQuery from Vuex
V2
- Collect the search query
- Pass the search query via Apollo_Link_State
- Call the GQL SEARCH_OPPORTUNITIES_QUERY and call Apollo_Link_State and pass the searchQuery into the GQL query

Functionality
- Search keywords and each checkbox gets added as attributes to the searchQueryFilters and then
gets passed to the Feed component to be used on the data

<template>
  <div class="search _box">
      <div class="searchRow">
          <input
            name="query"
            v-model="searchQueryFilters"
            placeholder="Search opportunities..."
          >
      </div>
      <!-- {{search}} -->
      <div class="filter">
        <div>Days:</div>
        <div class="days">
          <div>
            <input
              type="checkbox"
              v-model="query.today"
              @change="addToQuery('today', query.today)"
              >
            <label for="">Today</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.tomorrow"
              @change="addToQuery('tomorrow', query.tomorrow)"
              >
            <label for="">Tomorrow</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.thisWeek"
              @change="addToQuery('thisWeek', query.thisWeek)"
            >
            <label for="">This Week</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.thisWeekend"
              @change="addToQuery('thisWeekend', query.thisWeekend)"
            >
            <label for="">This Weekend</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.thisMonth"
              @change="addToQuery('thisMonth', query.thisMonth)"
            >
            <label for="">This Month</label>
          </div>
        </div>
        <div>Times:</div>
        <div class="times">
          <div>
            <input
              type="checkbox"
              v-model="query.mornings"
              @change="addToQuery('mornings', query.mornings)"
            >
            <label for="">Mornings</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.afternoons"
              @change="addToQuery('afternoons', query.afternoons)"
            >
            <label for="">Afternoons</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.evenings"
              @change="addToQuery('evenings', query.evenings)"
            >
            <label for="">Evenings</label>
          </div>
        </div>
        <div>My Activity:</div>
        <div class="times">
          <div>
            <input
              type="checkbox"
              v-model="query.interested"
              @change="addToQuery('interested', query.interested)"
            >
            <label for="">Interested</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.going"
              @change="addToQuery('going', query.going)"
            >
            <label for="">Going</label>
          </div>
          <div>
            <input
              type="checkbox"
              v-model="query.attended"
              @change="addToQuery('attended', query.attended)"
            >
            <label for="">Attended</label>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Feed',
  data: function () {
    return {
      query: this.$store.state.searchQueryFilters,
      userId: localStorage.getItem('graphcool-user-id')
    }
  },
  computed: {
    searchQueryFilters: {
      get () {
        return this.$store.state.searchQueryFilters.keywords
      },
      set (value) {
        let newObj = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
        newObj.keywords = value
        this.$store.commit('updateSearchQueryFilters', newObj)
      }
    }
  },
  methods: {
    // Add user id to query string
    // Filter opportunities by interestedUsers
    addToQuery (key, value) {
      let newObj = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
      newObj[key] = value
      console.log('New Query String', newObj)
      newObj.userId = this.userId
      this.$store.commit('updateSearchQueryFilters', newObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: auto;
  height: fit-content;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  grid-template-rows: 7vh auto;
  padding: 2vh;
}
.searchRow {
  input {
    width: calc(100% - 4vh);
    padding: .5vh 2vh;
    height: 4vh;
    border-radius: 3vh;
    border: .25vh solid var(--theme-color3);
  }
}
.days, .times {
  margin: 0vw 1vw;
  font-size: 2.1vh;
}
</style>
