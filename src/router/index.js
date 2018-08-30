import Vue from 'vue'
import Router from 'vue-router'

// Public Pages
import PublicHeader from '../components/public/PublicHeader'
import Login from '../components/public/Login'
import SignUp from '../components/public/SignUp'
import Home from '@/components/public/Home'

// Organization Console
import MyOpportunitiesPage from '../components/organizationConsole/volunteerOpportunities/MyOpportunitiesPage'

// User Console
import UserConsoleHeader from '../components/userConsole/UserConsoleHeader'
import FeedPage from '../components/userConsole/pages/FeedPage'
import ProfilePage from '../components/userConsole/pages/ProfilePage'
import NotificationsPage from '../components/userConsole/pages/NotificationsPage'

// Admin Console
import AdminHeader from '../components/adminConsole/AdminHeader'
import AdminDashboardPage from '../components/adminConsole/pages/AdminDashboardPage'
import AdminUsersPage from '../components/adminConsole/pages/AdminUsersPage'
import AdminOrgsPage from '../components/adminConsole/pages/AdminOrgsPage'
import AdminOpportunitiesPage from '../components/adminConsole/pages/AdminOpportunitiesPage'
import AdminMedallionsPage from '../components/adminConsole/pages/AdminMedallionsPage'
import AdminResponsesPage from '../components/adminConsole/pages/AdminResponsesPage'
import UserUpdate from '../components/adminConsole/modules/UserUpdate'
import UserRead from '../components/adminConsole/modules/UserRead'
import NewUsers from '../components/adminConsole/modules/NewUsers'
import { GC_USER_ID } from '../constants/settings'
import UsersMedallionsTable from '../components/adminConsole/modules/UsersMedallionsTable'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Router)

const router = new Router({
  routes: [
  // ======================================= Public Pages =============================================
    {
      path: '/',
      component: PublicHeader,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    },
    // ======================================= User Console Pages =============================================
    {
      path: '/',
      component: UserConsoleHeader,
      children: [
        {
          path: '/feed',
          component: FeedPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/myopportunities',
          component: MyOpportunitiesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/notifications',
          component: NotificationsPage,
          meta: {
            requiresAuth: true
          }
        },
        //  ------------------------------------------ User Pages ----------------------------------
        {
          path: '/profile',
          component: ProfilePage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    // ------------------------------------------ Admin ----------------------------------
    {
      path: '/admin',
      component: AdminHeader,
      children: [
        {
          path: 'dashboard',
          component: AdminDashboardPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'users',
          component: AdminUsersPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'user/:id',
          component: UserRead,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'user/update/:id',
          component: UserUpdate,
          name: 'updateUser',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'organizations',
          component: AdminOrgsPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'opportunities',
          component: AdminOpportunitiesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'medallions',
          component: AdminMedallionsPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'responses',
          component: AdminResponsesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'newusers',
          component: NewUsers,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'user/:id/medallions/',
          component: UsersMedallionsTable,
          name: 'usersMedallions',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'medallion/:id',
          component: UserRead,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ],
  // set mode to ‘history’ to remove the hash from the URLs
  mode: 'history'
})

// Need to add funcationality to default to a protected route if requiresAuth has not been set on a route
router.beforeEach((to, from, next) => {
  let currentUser = userId
  if (userId) {
    console.log('User is Authenticated')
  }
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('login')
  } else {
    next()
  }
})

export default router

// const router = new Router({
//   routes: [
//     {
//       path: '/people',
//       component: People,
//       meta: {
//         requiresAuth: true
//       }
//     }
//   ]
// })

// router.beforeEach((to, from, next) => {
//   const currentUser = userId
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requiresAuth && !currentUser) {
//     next('/login')
//   } else if (requiresAuth && currentUser) {
//     next()
//   } else {
//     next()
//   }
// })
