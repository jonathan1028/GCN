import Vue from 'vue'
import Vuex from 'vuex'
import apolloProvider from './apollo-provider'
import App from './App'
import router from './router'
import { GC_USER_ID } from './constants/settings'
import store from './store/index'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import { format, distanceInWords } from 'date-fns'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Vuex)

Vue.filter('formatDateLong', function (date) {
  if (date) {
    return format(date).format('MMMM Do YYYY, h:mm:ssa')
  }
})
Vue.filter('timeAgo', function (date) {
  let now = new Date()
  if (date !== null) {
    return distanceInWords(date, now) + ' ago'
  }
})
Vue.filter('capitalizeFirst', function () {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  data: {
    userId
  },
  render: h => h(App)
})
