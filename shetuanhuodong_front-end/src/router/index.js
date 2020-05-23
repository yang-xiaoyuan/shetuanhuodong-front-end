import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import axios from 'axios'
import 'jquery'
import 'bootstrap'
//import '../assets/bootstrap.min.css'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    redirect: '/home',
    children:[
        {
            path:'activity',
            component:() => import(/* webpackChunkName: "about" */ '../components/activity.vue')
        },
        {
            path:'team',
            component:() => import(/* webpackChunkName: "about" */ '../components/team.vue')
        },
        {
            path:'',
            component:() => import(/* webpackChunkName: "about" */ '../components/home.vue')
        },
        {
            path:'me',
            component:() => import(/* webpackChunkName: "about" */ '../components/me.vue')
        },
        {
            path:'activity_info',
            component:() => import(/* webpackChunkName: "about" */ '../components/activity_info.vue')
        },
        {
            path:'activity_in_team',
            component:() => import(/* webpackChunkName: "about" */ '../components/activity_in_team.vue')
        },
        {
            path:'create_team',
            component:() => import(/* webpackChunkName: "about" */ '../components/create_team.vue')
        },
        {
            path:'help',
            component:() => import(/* webpackChunkName: "about" */ '../components/help.vue')
        },
        {
            path:'personal_info',
            component:() => import(/* webpackChunkName: "about" */ '../components/personal_info.vue')
        },
        {
            path:'previous_activities',
            component:() => import(/* webpackChunkName: "about" */ '../components/previous_activities.vue')
        },
        {
            path:'previous_activity_info',
            component:() => import(/* webpackChunkName: "about" */ '../components/previous_activity_info.vue')
        },
        {
            path:'results',
            component:() => import(/* webpackChunkName: "about" */ '../components/results.vue')
        },
        {
            path:'team_info',
            component:() => import(/* webpackChunkName: "about" */ '../components/team_info.vue')
        },
        {
            path:'upload_time',
            component:() => import(/* webpackChunkName: "about" */ '../components/upload_time.vue')
        },
        {
            path:'users',
            component:() => import(/* webpackChunkName: "about" */ '../components/users.vue')
        },
        {
            path:'check_activity_in_team',
            component:() => import(/* webpackChunkName: "about" */ '../components/check_activity_in_team.vue')
        },
        {
            path:'sign_in_activity',
            component:() => import(/* webpackChunkName: "about" */ '../components/sign_in_activity.vue')
        },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
