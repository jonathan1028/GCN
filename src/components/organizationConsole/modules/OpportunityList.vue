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
            {{`with ${Organization.name}`}}
          </div>
          <div class="description">
            {{item.description}}
          </div>
          <div class="details">
            <icon
              class="icon"
              name="regular/calendar-alt"
            ></icon>
            <div>
              <div>{{item.startTime | formatDate}} <span v-if="item.endTime"> - </span></div>
              <div>{{item.endTime | formatDate}}</div>
            </div>
            <icon
              class="icon"
              name="map-marker-alt"
            ></icon>
            <div>
              <span v-if="item.location">
                <div>
                  {{item.location.name}}
                </div>
                <div>
                  {{item.location.addressLine1}}
                </div>
                <div>
                  {{`${item.location.city}, ${item.location.state} ${item.location.zipcode}`}}
                </div>
              </span>
            </div>
          </div>
        </div>
        <!-- ---------------------------------------- User Responses -------------------------- -->
        <!-- <div class="user-responses">
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
                  <div class="user-response-text">{{`${getName(response.ownedBy.firstName, response.ownedBy.lastName)} is ${response.type}`}}&nbsp;</div>
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
        </div> -->
        <!-- -------------------------------------- Right Column ------------------------------ -->
        <div class="right-column">
          <div class="time-stamp">
            1h
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { GET_ORGANIZATION_QUERY } from '../../../constants/graphql/organizations'
import { format, isToday, isTomorrow, isSaturday, isSunday, isThisWeek, isThisMonth } from 'date-fns'

export default {
  name: 'OpportunityList',
  data: function () {
    return {
      searchQueryFilters: [],
      Organization: {}
    }
  },
  apollo: {
    // The name of this variable must equal to the name of back-end API function
    Organization: {
      query: GET_ORGANIZATION_QUERY,
      variables () {
        return {
          id: this.$store.state.selectedProfile.id
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo data is read only
        this.Organization = JSON.parse(JSON.stringify(data.Organization))
      }
    }
  },
  filters: {
    formatDate: function (date) {
      if (date !== null) {
        return format(date, 'MMMM Do YYYY, h:mm a')
      }
    }
  },
  computed: {
    // ...mapGetters(['authenticated', 'userId', 'userEmail', 'user', 'selectedProfile']),
    filteredData: function () {
      let data = this.Organization.opportunities
      console.log('Opportunities', data)
      let filters = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
      let userId = localStorage.getItem('graphcool-user-id')
      // Removes case sensitivity
      var keywords = filters.keywords && filters.keywords.toLowerCase()
      // var sortKey = this.sortKey
      // var order = this.sortOrders[sortKey] || 1

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
          return item.responses.find(x => x.ownedBy.id === userId && x.type === 'Interested')
        })
      }
      if (filters.going) {
        data = data.filter(function (item) {
          return item.responses.find(x => x.ownedBy.id === userId && x.type === 'Going')
        })
      }
      if (filters.attended) {
        data = data.filter(function (item) {
          return item.responses.find(x => x.ownedBy.id === userId && x.type === 'Attended')
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
      return data

      // if (sortKey) {
      //   data = data.slice().sort(function (a, b) {
      //     a = a[sortKey]
      //     b = b[sortKey]
      //     return (a === b ? 0 : a > b ? 1 : -1) * order
      //   })
      // }
    }
  },
  methods: {
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
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
  margin-bottom: 1vh;
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
  color: var(--font-color1);
  font-size: 1.8vh;
}

.details {
  grid-area: details;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 5% 45% 5% 45%;
  margin-top: 2vh;
  font-size: 1.8vh;
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
