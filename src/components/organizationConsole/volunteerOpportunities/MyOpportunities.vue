<template>
  <div>
    <ul class="feedList">
      <li
        class="feedItem"
        v-for='(item, index) in filteredData'
        :key='index'
      >
        <div class="imageBlock">
          <img src="" href=''>
        </div>
        <div class="textBlock">
          <div>{{item.name}}</div>
          <div class="orgNameBlock">
            <p>with &nbsp;</p>
            <p class="orgName">Organization Name</p>
          </div>
          <p class="description">{{item.description}}</p>
        </div>
        <div class="timeLocationBlock">
          <p class="startTime">{{item.startTime | formatDate}}</p>
          <!-- <p>{{item.endTime | formatDate}}</p> -->
          <p class="location">{{item.address}}</p>
        </div>
        <div class="rightColumn">
          <button @click="edit(item)">Edit</button>
          <button @click="remove(item)">Delete</button>
          1h
        </div>
        <div class="buttonsBlock">
          <button @click='interested(item)'>Interested</button>
          <button>Going</button>
          <button>Ignore</button>
        </div>
        <div class="usersBlock">
          <ul>
            <li
              class="userStatus"
              v-for='(user, index) in item.interestedUsers'
              :key='index'
            >
              <div class="userName">{{getName(user.firstName, user.lastName)}} &nbsp;</div>
              <div>is interested</div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { ALL_USERS_QUERY } from '../../../constants/graphql'
import { UPDATE_OPPORTUNITY_MUTATION, ALL_OPPORTUNITIES_QUERY, DELETE_OPPORTUNITY_MUTATION } from '../../../constants/graphql'
// import { USERS_ON_FEED_QUERY } from '../../../constants/graphql'
import moment from 'moment'

export default {
  name: 'Feed',
  props: {
    data: Array,
    columns: Array,
    searchQuery: String
  },
  data: function () {
    var sortOrders = {}
    const fields = this.columns.map(x => x.dbField)
    fields.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      // searchQuery: '',
      allOpportunities: [],
      usersOnFeed: [
        // {name: 'Caleb Jones', status: 'is going'},
        // {name: 'Michael J. Foxworthy', status: 'is interested'},
        // {name: 'Joseph Smith', status: 'volunteered'},
        // {name: 'Michael Johnson', status: 'donated'}

      ]
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.searchQuery && this.searchQuery.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.allOpportunities
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatDate: function (date) {
      if (date !== null) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  },
  methods: {
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    edit (obj) {
      this.$store.commit('updateCurrentOpportunity', obj)
      this.$store.commit('updateActiveModal', 'update')
    },
    remove (obj) {
      this.$apollo.mutate({
        mutation: DELETE_OPPORTUNITY_MUTATION,
        variables: {
          id: obj.id
        },
        update: (store, { data: { deleteOpportunity } }) => {
          const data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
          // Remove item from the list
          const index = data.allOpportunities.findIndex(x => x.id === obj.id)
          if (index !== -1) {
            data.allOpportunities.splice(index, 1)
          }
          // Take the modified data and write it back into the store.
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data })
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    interested (opportunity) {
      let userId = localStorage.getItem('graphcool-user-id')

      this.$apollo.mutate({
        mutation: UPDATE_OPPORTUNITY_MUTATION,
        variables: {
          id: opportunity.id,
          name: opportunity.name,
          interestedUsersIds: userId
        },
        update: (store, { data: { updateOpportunity } }) => {
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: updateOpportunity })
        }
      })
    }
  },
  apollo: {
    // The name of this variable must equal to the name of back-end API function
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 4vh;
  padding: 1%;
  input {
    width: 25vw;
    height: 3vh;
    font-size: 2.5vh;
    color: var(--text-color1);
  }
}
.feedList {
  height: 80vh;
  overflow-y: scroll;
}
.feedItem {
  display: grid;
  grid-template-columns: 10% 68% 10%;
  grid-template-rows: 20% 10% 10% 50%;
  grid-column-gap: 5%;
  background-color: white;
  margin-top: 1%;
  padding: 2%;
  /* border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;
}
.imageBlock {
  height: 10vh;
  width: 10vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: lightgray;
  border-radius: 5vh;
}
.textBlock {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  // padding-left: 5%;
  font-size: 3vh;
  p {
    font-size: 2vh;
  }
  // border: 1px solid red;
}
.orgNameBlock {
  display: flex;
}
.orgName {
  text-decoration: underline;
}
.description {
  margin-top: 1vh;
}
.timeLocationBlock {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  justify-content: space-between;
  p{
    font-size: 2vh;
  }
  // border: 1px solid red;
}
.rightColumn {
  grid-row-start: 1;
  grid-row-end: -1;
  grid-column-start: 3;
  grid-column-end: 4;
  // background-color: gray;
  width: 10vh;
  height: 10vh;
}
.buttonsBlock {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 3;
  padding-top: 3%;
  button {
    border: .1vh solid var(--text-color1);
    background-color: var(--theme-color1);
  }
}
.usersBlock {
  margin-top: 2%;
  padding-top: 2%;
  border-top: .25vh solid lightgray;
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: -1;
}
.userStatus {
  display: flex;
  margin: 1% 0%;
  padding: 1% 2%;
  border: .25vh solid lightgray;
  border-radius: 3vh;
  font-size: 1.75vh;
  width: max-content;
  background-color: var(--theme-color2);
}
.userName {
  color: black;
  font-weight: 900;
}
</style>
