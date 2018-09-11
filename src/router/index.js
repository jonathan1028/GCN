import Vue from 'vue'
import Router from 'vue-router'

// Public Pages
import PublicLayout from '../components/public/PublicLayout'
import Home from '@/components/public/Home'
import Login from '../components/public/Login'
import SignUp from '../components/public/SignUp'
import OrganizationSignUpPage from '../components/public/OrganizationSignUpPage'

// Organization Console
import OrganizationConsoleLayout from '../components/organizationConsole/OrganizationConsoleLayout'
import OrganizationProfilePage from '../components/organizationConsole/pages/OrganizationProfilePage'
import MyOpportunitiesPage from '../components/organizationConsole/pages/MyOpportunitiesPage'
import MyVolunteersPage from '../components/organizationConsole/pages/MyVolunteersPage'
import OpportunityPage from '../components/organizationConsole/pages/OpportunityPage'

// User Console
import UserConsoleLayout from '../components/userConsole/UserConsoleLayout'
import FeedPage from '../components/userConsole/pages/FeedPage'
import ProfilePage from '../components/userConsole/pages/ProfilePage'
import NotificationsPage from '../components/userConsole/pages/NotificationsPage'

// Admin Console
import AdminLayout from '../components/adminConsole/AdminLayout'
import AdminDashboardPage from '../components/adminConsole/pages/AdminDashboardPage'
import AdminUsersPage from '../components/adminConsole/pages/AdminUsersPage'
import AdminOrgsPage from '../components/adminConsole/pages/AdminOrgsPage'
import AdminOpportunitiesPage from '../components/adminConsole/pages/AdminOpportunitiesPage'
import AdminMedallionsPage from '../components/adminConsole/pages/AdminMedallionsPage'
import AdminResponsesPage from '../components/adminConsole/pages/AdminResponsesPage'
import UserUpdate from '../components/adminConsole/modules/UserUpdate'
import UserRead from '../components/adminConsole/modules/UserRead'
import NewUsers from '../components/adminConsole/modules/NewUsers'
// import { GC_USER_ID } from '../constants/settings'
import UsersMedallionsTable from '../components/adminConsole/modules/UsersMedallionsTable'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [
  // ======================================= Public Pages =============================================
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      component: PublicLayout,
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
          component: SignUp,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'organization/signUp',
          component: OrganizationSignUpPage,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    // ======================================= User Console Pages =============================================
    {
      path: '/',
      component: UserConsoleLayout,
      children: [
        {
          path: '/feed',
          component: FeedPage,
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
        {
          path: '/profile',
          component: ProfilePage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    // ======================================= Organization Console Pages =============================================
    {
      path: '/organization',
      component: OrganizationConsoleLayout,
      children: [
        {
          path: 'profile/:id',
          component: OrganizationProfilePage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'myOpportunities',
          component: MyOpportunitiesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'opportunity/:id',
          component: OpportunityPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'myVolunteers',
          component: MyVolunteersPage,
          meta: {
            requiresAuth: true
          }
        }
        // {
        //   path: '/feed',
        //   component: FeedPage,
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
        // {
        //   path: '/myopportunities',
        //   component: MyOpportunitiesPage,
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
        // {
        //   path: '/notifications',
        //   component: NotificationsPage,
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
      ]
    },
    // ------------------------------------------ Admin ----------------------------------
    {
      path: '/admin',
      component: AdminLayout,
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
          path: 'organization/:id',
          component: OrganizationProfilePage,
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
  if (store.getters.authenticated) {
    console.log('User is Authenticated from router')
  }

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !store.getters.authenticated) {
    next('login')
  } else {
    next()
  }
})

export default router
