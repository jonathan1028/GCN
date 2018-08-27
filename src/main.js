import Vue from 'vue'
import Vuex from 'vuex'
import apolloProvider from './apollo-provider'
import App from './App'
import router from './router'
import { GC_USER_ID } from './constants/settings'
import store from './store/index'
import moment from 'moment'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Vuex)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
Vue.filter('relativeTime', function (value) {
  if (value) {
    return moment(String(value)).startOf('day').fromNow()
  }
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

router.beforeEach((to, from, next) => {
  const currentUser = userId
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
