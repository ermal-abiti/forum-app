import axios from "axios";
import Vue from "vue";
import Vuex from "vuex"
import isAuth from "./cookies/isAuth.js"
import getCookie from "./cookies/getCookie.js"

Vue.use(Vuex)

const state = {
    loggedIn: false,
    user: "",
    posts: [],
    followingPosts: [],
    token: ""
}

const getters = {
    aPo: (state) => {
        return state.loggedIn ? "po" : "jo"
    },
}

const mutations = {
    authCheck (state) {
        isAuth().then(res=>{
            state.loggedIn = res
        })
    },
    async userLoggedIn(state) {
        const result = await axios.get(process.env.VUE_APP_API_URL + '/users/getLoggedUser', {
                headers: {
                    token: getCookie('token')
                }
            })
        state.user = result.data
        state.token = getCookie('token')
    
    },

    async getAllPosts(state) {
        state.posts = []
        const result = await axios.get(process.env.VUE_APP_API_URL + '/posts', {
            headers: {
                token: state.token
            }
        })
        state.posts = result.data
    },

    async getFollowingsPosts(state) {
        state.followingPosts = []
        const result = await axios.get(process.env.VUE_APP_API_URL + '/followingPosts', {
            headers: {
                token: state.token
            }
        });
        state.followingPosts = result.data
    },

    async emptyFollowingPosts(state) {
        state.followingPosts = []
    },

    userLogOut (state) {
        state.loggedIn = false
    },

    userLogIn (state) {
        state.loggedIn = true
    }
}

const actions = {
    authCheck: ({commit})=> commit('authCheck'),
    userLogOut: ({commit})=> commit('userLogOut'),
    userLogIn: ({commit})=> commit('userLogIn'),
    userLoggedIn: ({commit})=> commit('userLoggedIn'),
    getAllPosts: ({commit})=> commit('getAllPosts'),
    getFollowingsPosts: ({commit})=> commit('getFollowingsPosts'),
    emptyFollowingPosts: ({commit})=> commit('emptyFollowingPosts'),
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})