import axios from "axios";
import Vue from "vue";
import Vuex from "vuex"
import isAuth from "./cookies/isAuth.js"
import getCookie from "./cookies/getCookie.js"

Vue.use(Vuex)

const authHeaders = {
    headers: {
        token: getCookie('token')
    }
}
const state = {
    loggedIn: false,
    user: "",
    posts: []
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
        const result = await axios.get('http://localhost:5050/api/users/getLoggedUser', {
                headers: {
                    token: getCookie('token')
                }
            })
        state.user = result.data
    
    },
    // get all posts - mutation
    async getAllPosts(state) {
        const result = await axios.get('http://localhost:5050/api/posts', authHeaders)
        console.log("Store.js: ", result);
        state.posts = result.data
        console.log("state.posts: ", state.posts);
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
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})