<template>
  <div>
    <ul class="feedList">
      <li
        class="feedItem"
        v-for='(item, index) in filteredData'
        :key='index'
      >
        <div class="left-column">
          <div class="image-block">
            <img src="" href=''>
          </div>
        </div>
        <!-- -------------------------------------- Center Column ------------------------------ -->
        <div class="center-column">
          <div class="title">
            <div>{{item.name}}</div>
          </div>
          <div class="org-name">
            {{`with Organization Name`}}
          </div>
          <div class="description">
            {{item.description}}
          </div>
          <div class="details">
            <icon
              class="icon"
              name="regular/calendar-alt"
            ></icon>
            <div>{{item.startTime | formatDate}} <span v-if="item.endTime"> - </span></div>
            <icon
              class="icon"
              name="map-marker-alt"
            ></icon>
            <div>6500 Metropolis Dr</div>
            <div></div>
            <div>{{item.endTime | formatDate}}</div>
            <div></div>
            <div>Austin, TX 78744</div>
          </div>
        </div>
        <div class="buttons-block">
          <div class="left-buttons">
            <button
              class="button1"
              v-bind:class="{ active: isInterested(item) }"
              @click='response(item, "Interested")'
            >
              <icon
                class="icon"
                name="regular/thumbs-up"
              ></icon>
              <div class="button-text">
                Interested
              </div>
            </button>
            <button
              class="button2"
              v-bind:class="{ active: isGoing(item) }"
              @click='response(item, "Going")'
            >
              <icon
                class="icon"
                name="check"
              ></icon>
              <div class="button-text">
                Going
              </div>
            </button>
            <button
              class="button3"
              @click='undo(item)'
            >
              <icon
                class="icon"
                name="undo"
              ></icon>
              <div class="button-text">
                Undo
              </div>
            </button>
          </div>
          <button
            class="button4"
          >
            <icon
              class="icon"
              name="regular/clock"
            ></icon>
            <div class="button-text">
              Log Time
            </div>
          </button>
        </div>
        <!-- ---------------------------------------- User Responses -------------------------- -->
        <div class="user-responses">
          <div class="user-response-header">
            <div class="user-response-summary">
              <div>Images</div>
              <div>Responses summary text</div>
            </div>
            <button
              class="toggle"
              @click="selected.includes(item.id) ? selected.splice(selected.indexOf(item.id), 1) : selected.push(item.id)"
            >
              <div v-show="!selected.includes(item.id)">
                <icon
                  class="icon"
                  name="chevron-down"
                ></icon>
              </div>
              <div v-show="selected.includes(item.id)">
                <icon
                  class="icon"
                  name="chevron-up"
                ></icon>
              </div>
            </button>
          </div>
          <div v-show="selected.includes(item.id)">
            <ul
              v-for='(response, index) in item.responses'
              :key="index + '-interested'"
            >
              <li class="user-response _box-shadow1">
                <div class="user-response-row">
                  <div class="user-response-image"></div>
                  <div class="user-response-text">{{`${getName(response.ownedBy.firstName, response.ownedBy.lastName)} is ${response.type.toLowerCase()}`}}&nbsp;</div>
                </div>
                <div class="user-response-row2">
                  <div class="user-response-timestamp">{{response.createdAt | timeAgo}}</div>
                  <button class="button1">
                    <icon
                      class="icon"
                      name="star"
                    ></icon>
                    <div class="button-text">
                      Recognize
                    </div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- -------------------------------------- Right Column ------------------------------ -->
        <div class="right-column">
          <div class="time-stamp">
            1h
          </div>
        </div>
        <!-- <div class="timeLocationBlock">
        </div>
        <div class="usersBlock">
          <ul
            v-for='(user, index) in item.interestedUsers'
            :key="index + '-interested'"
          >
            <li class="userStatus">
              <div class="userName">{{getName(user.firstName, user.lastName)}}&nbsp;</div>
              <div>is interested</div>
            </li>
            <div>Recognize</div>
          </ul>
          <ul>
            <li
              class="userStatus"
              v-for='(user, index) in item.goingUsers'
              :key="index + '-going'"
            >
              <div class="userName">{{getName(user.firstName, user.lastName)}}&nbsp;</div>
              <div>is going</div>
            </li>
          </ul>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
// import 'font-awesome/css/font-awesome.css'
// import { ALL_USERS_QUERY } from '../../../constants/graphql'
import { ALL_RESPONSES_QUERY, CREATE_RESPONSE_MUTATION, DELETE_RESPONSE_MUTATION, ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
import moment from 'moment'
import { format, isToday, isTomorrow, isSaturday, isSunday, isThisWeek, isThisMonth, distanceInWords } from 'date-fns'

console.log('Test, test ,test')

export default {
  name: 'Feed',
  props: {
    data: Array,
    columns: Array
  },
  data: function () {
    // console.log('Search Query', this.$store.state.searchQuery)
    var sortOrders = {}
    const fields = this.columns.map(x => x.dbField)
    fields.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      searchQueryFilters: [],
      Opportunities: [],
      usersOnFeed: [
        // {name: 'Caleb Jones', status: 'is going'},
        // {name: 'Michael J. Foxworthy', status: 'is interested'},
        // {name: 'Joseph Smith', status: 'volunteered'},
        // {name: 'Michael Johnson', status: 'donated'}

      ],
      allResponses: [],
      selected: []
      // showResponsesActive: false
    }
  },
  apollo: {
    // The name of this variable must equal to the name of back-end API function
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY,
      result ({ data }) {
        // Creates clone of data because Apollo data is read only
        this.Opportunities = JSON.parse(JSON.stringify(data.allOpportunities))
      }
    },
    allResponses: {
      query: ALL_RESPONSES_QUERY
    }
  },
  computed: {
    filteredData: function () {
      console.log('Responses', this.allResponses)
      console.log('Opportunities', this.allOpportunities)
      let filters = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
      let data = this.Opportunities
      let userId = localStorage.getItem('graphcool-user-id')
      // Removes case sensitivity
      var keywords = filters.keywords && filters.keywords.toLowerCase()
      // var sortKey = this.sortKey
      // var order = this.sortOrders[sortKey] || 1
      // console.log('Filter Key', filterKey)

      if (filters.today) {
        data = data.filter(function (item) {
          console.log('Today', isToday(item.startTime))
          return isToday(item.startTime)
        })
      }
      if (filters.tomorrow) {
        data = data.filter(function (item) {
          console.log('Today', isTomorrow(item.startTime))
          return isTomorrow(item.startTime)
        })
      }
      if (filters.thisWeekend) {
        data = data.filter(function (item) {
          let test = isThisWeek(item.startTime) && (isSaturday(item.startTime) || isSunday(item.startTime))
          console.log('This Weekend', test)
          return test
        })
      }
      if (filters.thisWeek) {
        data = data.filter(function (item) {
          let meetsRange = (isThisWeek(item.startTime) && !isSaturday(item.startTime) && !isSunday(item.startTime))
          console.log('This Week', meetsRange)
          return meetsRange
        })
      }
      if (filters.thisMonth) {
        data = data.filter(function (item) {
          console.log('Today', isThisMonth(item.startTime))
          return isThisMonth(item.startTime)
        })
      }
      if (filters.mornings) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          console.log('Mornings', time)
          return format(item.startTime, 'H') < 12
        })
      }
      if (filters.afternoons) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          let meetsRange = time > 12 && time < 17
          console.log('Afternoons', meetsRange)
          return meetsRange
        })
      }
      if (filters.evenings) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          let meetsRange = time > 16
          console.log('Evenings', meetsRange)
          return meetsRange
        })
      }
      if (filters.interested) {
        data = data.filter(function (item) {
          // Creates an array of interestedUsersIds
          let interestedUsersIds = item.interestedUsers.map(x => {
            return x.id
          })
          return interestedUsersIds.includes(userId)
        })
      }
      if (filters.going) {
        data = data.filter(function (item) {
          // Creates an array of interestedUsersIds
          let goingUsersIds = item.goingUsers.map(x => {
            return x.id
          })
          return goingUsersIds.includes(userId)
        })
      }
      if (filters.attended) {
        data = data.filter(function (item) {
          // Creates an array of interestedUsersIds
          let attendedUsersIds = item.attendedUsers.map(x => {
            return x.id
          })
          return attendedUsersIds.includes(userId)
        })
      }
      if (keywords) {
        data = data.filter(function (row) {
          // Pulls out all keys in the current object and iterates over them
          return Object.keys(row).some(function (key) {
            // Returns the index# where this object's key matches the filterKey
            return String(row[key]).toLowerCase().indexOf(keywords) > -1
          })
        })
      }

      // if (sortKey) {
      //   data = data.slice().sort(function (a, b) {
      //     a = a[sortKey]
      //     b = b[sortKey]
      //     return (a === b ? 0 : a > b ? 1 : -1) * order
      //   })
      // }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatDate: function (date) {
      if (date !== null) {
        return moment(date).format('MMMM Do YYYY, h:mm a')
      }
    },
    timeAgo: function (date) {
      let now = new Date()
      if (date !== null) {
        return distanceInWords(date, now) + ' ago'
      }
    }
  },
  methods: {
    showResponses (item) {
      item['showResponsesActive'] = !item.showResponsesActive
      console.log('Response State', item.showResponsesActive)
    },
    // showResponsesActive (item) {
    //   return item.showResponsesActive
    // },
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    isInterested (opportunity) {
      let userId = localStorage.getItem('graphcool-user-id')
      let response = opportunity.responses.find(x => x.ownedBy.id === userId)
      if (response) {
        return response.type === 'Interested'
      } else {
        return false
      }
    },
    isGoing (opportunity) {
      let userId = localStorage.getItem('graphcool-user-id')
      let response = opportunity.responses.find(x => x.ownedBy.id === userId)
      if (response) {
        return response.type === 'Going'
      }
      return false
    },
    hasResponded (opportunity) {
      let userId = localStorage.getItem('graphcool-user-id')
      let index = opportunity.responses.findIndex(x => x.ownedBy.id === userId)
      return index !== -1
    },
    response (opportunity, type) {
      let userId = localStorage.getItem('graphcool-user-id')
      // Check to see if user has responded yet
      let response = opportunity.responses.find(x => x.ownedBy.id === userId)
      console.log('Response', response)

      if (response && response.type !== type) {
        this.$apollo.mutate({
          mutation: DELETE_RESPONSE_MUTATION,
          variables: {
            id: response.id
          },
          update: (cache, { data: { deleteResponse } }) => {
            // For some reason when the data is coming from the store, the response has already been deleted
            // Not sure what is causing this
            let { allOpportunities } = cache.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
            // Find index of Opportunity in store
            let storedOpportunity = allOpportunities.find(x => x.id === opportunity.id)
            console.log('Stored Opportunity', storedOpportunity)

            let index = storedOpportunity.responses.findIndex(x => x.id === response.id)
            if (index !== -1) {
              storedOpportunity.responses.splice(index, 1)
            }
            console.log('Stored Opportunity Edit', storedOpportunity)
            // Write new data back to the store
            cache.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: { allOpportunities: allOpportunities } })
          }
        }).then((data) => {
          this.$apollo.mutate({
            mutation: CREATE_RESPONSE_MUTATION,
            variables: {
              type: type,
              ownedById: userId,
              opportunityId: opportunity.id
            },
            update: (store, { data: { createResponse } }) => {
              // Pull data from the store
              let data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
              // Create a local version of the object
              let user = this.$store.state.auth.user
              console.log('Update Data', createResponse)
              createResponse['type'] = type
              createResponse['ownedBy'] = user
              createResponse['opportunityId'] = opportunity.id
              createResponse['createdAt'] = new Date()
              // Add the object to the query
              let index = data.allOpportunities.findIndex(x => x.id === opportunity.id)
              if (index !== -1) {
                data.allOpportunities[index].responses.push(createResponse)
              }
              // Write new data back to the store
              store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
            }
          })
        })
      }

      // If user has not yet responded create Reponse object
      if (!response) {
        this.$apollo.mutate({
          mutation: CREATE_RESPONSE_MUTATION,
          variables: {
            type: type,
            ownedById: userId,
            opportunityId: opportunity.id
          },
          update: (store, { data: { createResponse } }) => {
            // Pull data from the store
            let data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
            // Create a local version of the object
            let user = this.$store.state.auth.user
            console.log('Update Data', createResponse)
            createResponse['type'] = type
            createResponse['ownedBy'] = user
            createResponse['opportunityId'] = opportunity.id
            createResponse['createdAt'] = new Date()
            // Add the object to the query
            let index = data.allOpportunities.findIndex(x => x.id === opportunity.id)
            if (index !== -1) {
              data.allOpportunities[index].responses.push(createResponse)
            }
            // Write new data back to the store
            store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
          }
        })
      }
    },
    undo (opportunity) {
      console.log('Undo function ran')
      let response = {}
      let userId = localStorage.getItem('graphcool-user-id')
      // Check if user has responded
      if (this.hasResponded(opportunity)) {
        // Find response by userId
        response = opportunity.responses.find(x => x.ownedBy.id === userId)
        this.$apollo.mutate({
          mutation: DELETE_RESPONSE_MUTATION,
          variables: {
            id: response.id
          },
          update: (cache, { data: { deleteResponse } }) => {
            // For some reason when the data is coming from the store, the response has already been deleted
            // Not sure what is causing this
            let { allOpportunities } = cache.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
            // Find index of Opportunity in store
            let storedOpportunity = allOpportunities.find(x => x.id === opportunity.id)
            console.log('Stored Opportunity', storedOpportunity)

            let index = storedOpportunity.responses.findIndex(x => x.id === response.id)
            if (index !== -1) {
              storedOpportunity.responses.splice(index, 1)
            }
            console.log('Stored Opportunity Edit', storedOpportunity)
            // Write new data back to the store
            cache.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: { allOpportunities: allOpportunities } })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feedList {
  // height: 80vh;
  // overflow-y: scroll;
}
.feedItem {
  display: grid;
  // ------ GRID ----------
  // pic title/org  timestamp
  // pic opp-info   timestamp
  // XXX button-row XXX
  // ------ Followers -------
  grid-template-columns: 13% 78% 5%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
     "left-column      center-column            right-column"
     "left-column      center-column         .    "
     "left-column      center-column          .    "
     ".                buttons-block .    "
     "user-responses   user-responses    user-responses"
     "response-summary response-summary response-summary"
     "responses        responses        responses";
  grid-column-gap: 2%;
  background-color: white;
  margin-top: 1%;
  padding: 2%;
  /* border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;
  // border-radius: 3vh;
}
.left-column {
  grid-area: left-column;
  // border: 1px solid black;
}
.center-column {
  grid-area: center-column;
  // border: 1px solid black;
}
.right-column {
  grid-area: right-column;
  text-align: right;
  // border: 1px solid black;
}
.image-block {
  height: 10vh;
  width: 10vh;
  grid-area: image-block;
  background-color: lightgray;
  border-radius: 5vh;
}
.title {
  grid-area: title;
  font-size: 3vh;
  color: var(--font-color1);
}

.org-name {
  grid-area: org-name;
  display: flex;
}

.description {
  grid-area: description;
  margin-top: 1vh;
  font-weight: 100;
}

.details {
  grid-area: details;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 5% 45% 5% 45%;
  margin-top: 1vh;
}

.textBlock {
  font-size: 3vh;
  p {
    font-size: 2vh;
  }
  // border: 1px solid red;
}

.icon {
  padding-top: .25vh;
}
.orgName {
  text-decoration: underline;
}

.timeLocationBlock {
  display: flex;
  justify-content: space-between;
  p{
    font-size: 2vh;
  }
  // border: 1px solid red;
}

.rightColumn {
  // background-color: gray;
  width: 10vh;
  height: 10vh;
}
.buttons-block {
  // border: 1px solid red;
  grid-area: buttons-block;
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-buttons {
    display: flex;
    align-items: center;
  }
  .button1 {
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
    border-right: none;
  }
  .button3 {
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
    border-left: none;
  }
  .button4 {
    border-radius: 1vh;
  }
}
.user-responses {
  grid-area: user-responses;
  margin-top: 2%;
  // padding-top: 2%;
  border-top: .25vh solid lightgray;
  .user-response-header {
    display: flex;
    justify-content: space-between;
    margin-top: 1vh;
    margin-bottom: 2vh;
  }
  .user-response-summary {
    display: flex;
    align-items: center;
    font-size: 1.5vh;
  }
  .user-response {
    display: grid;
    grid-template-rows: auto auto;
    padding: 2%;
    margin-bottom: 2vh;
  }
  .user-response-image {
    height: 4vh;
    width: 4vh;
    background-color: lightgray;
    border-radius: 5vh;
  }
  .user-response-text {
    font-size: 2.3vh;
    margin-left: 2vh;
  }
  .user-response-timestamp {
    font-size: 1.8vh;
  }
  .user-response-row {
    display: flex;
    align-items: center;
  }
  .user-response-row2 {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .button1 {
    border-radius: 1vh;
  }
}
// .userStatus {
//   display: flex;
//   margin: 1% 0%;
//   padding: 1% 2%;
//   border: .25vh solid lightgray;
//   border-radius: 3vh;
//   font-size: 1.75vh;
//   width: max-content;
//   background-color: var(--theme-color2);
// }
.userName {
  color: black;
  font-weight: 900;
}
button {
  display: flex;
  align-items: center;
  font-size: 1.5vh;
  padding: 1vh;
  margin: 0vh;
  height: auto;
  border: .1vh solid var(--theme-color3);
  cursor: pointer;
  // background-color: var(--theme-color1);
  .button-text {
    margin-left: 1vh;
  }
}
.active {
  background-color: var(--background-color1);
}
button:hover {
  background-color: lightgray;
}
.toggle {
  border: none;
}
.toggle:hover {
  background-color: var(--background-color2);
}
</style>
