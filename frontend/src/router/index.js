import Vue from 'vue';
// import getCookie from "../cookies/getCookie.js"
import isAuth from '../cookies/isAuth.js';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import store from '../store.js';
import Posts from '../components/posts/Posts.vue';
import UserProfiles from '../components/profiles/UserProfiles.vue';
import SinglePost from '../components/posts/SinglePost.vue';
import Dashboard from '../components/parts/Dashboard.vue';

import SingleUser from '../components/profiles/SingleUser.vue';

Vue.use(VueRouter);

function loginTest(to, from, next) {
    if (to.name !== 'Login' && !store.state.loggedIn) next({ name: 'Login' });
    else next();
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        beforeEnter(to, from, next) {
            loginTest(to, from, next);
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
        beforeEnter(to, from, next) {
            isAuth().then((res) => {
                let isAuthenticated = res;
                if (to.name == 'Login' && isAuthenticated) next({ name: 'Home' });
                else next();
            });
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter(to, from, next) {
            isAuth().then((res) => {
                let isAuthenticated = res;
                if (to.name == 'Register' && isAuthenticated) next({ name: 'Home' });
                else next();
            });
        },
    },

    //new routes
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
    },
    {
        path: '/userprofile',
        name: 'UserProfiles',
        component: UserProfiles,
    },
    {
        path: '/singlepost',
        name: 'SinglePost',
        component: SinglePost,
    },
    {
        path: '/profile',
        name: 'SingleUser',
        component: SingleUser,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
