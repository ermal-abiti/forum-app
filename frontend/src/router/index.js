import Vue from 'vue'
// import getCookie from "../cookies/getCookie.js"
import isAuth from '../cookies/isAuth.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'

Vue.use(VueRouter)

function loginTest(to, from, next) {
  isAuth().then(res=> {
    let isAuthenticated = res
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  })
  // console.log(isAuthenticated);
  
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter (to, from, next) {
      loginTest(to, from, next)
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      isAuth().then(res =>{
        let isAuthenticated = res
        if (to.name == 'Login' && isAuthenticated) next({name:'Home'})
        else next()
      })
      
  }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
