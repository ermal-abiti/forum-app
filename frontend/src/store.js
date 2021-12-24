import axios from "axios";
import Vue from "vue";
import Vuex from "vuex"
import isAuth from "./cookies/isAuth.js"
import getCookie from "./cookies/getCookie.js"

Vue.use(Vuex)

const state = {
    loggedIn: false,
    user: ""
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
                    userid: getCookie('userid'),
                    token: getCookie('token')
                }
            })
        state.user = result.data.username
    
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
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})