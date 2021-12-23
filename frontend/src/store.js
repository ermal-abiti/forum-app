import Vue from "vue";
import Vuex from "vuex"
import isAuth from "./cookies/isAuth.js"

Vue.use(Vuex)

const state = {
    loggedIn: false
}

const getters = {
    aPo: (state) => {
        return state.loggedIn ? "po" : "jo"
    }
}

const mutations = {
    authCheck (state) {
        isAuth().then(res=>{
            state.loggedIn = res
        })
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
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})