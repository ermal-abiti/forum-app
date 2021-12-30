<template>
<nav class="navbar is-dark">
  <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <i class="fas fa-box"> Forum App</i>
        </router-link>
        <button v-bind:class="{ 'is-active': activator }" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarExampleTransparentExample" @click="makeBurger" >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'is-active': activator }">
    <div class="navbar-start">
      <!-- <router-link class="navbar-item" to="/">Home</router-link> -->
      <router-link class="navbar-item" to="/posts">Posts</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
    </div>
    
    <div class="navbar-middle">
      <div v-if="!($store.state.loggedIn)">
      </div>
      <div class="navbar-item field" v-else>
              <p class="control has-icons-right">
                <input class="input" type="search" placeholder="Search...">
                <span class="icon is-small is-right">
                  <i class="fas fa-search"></i>
                </span>
              </p>
      </div>
    </div>


      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="!($store.state.loggedIn)">
          <a class="navbar-link">Account</a>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="/login">Login</router-link>
            <router-link class="navbar-item" to="/register">Register</router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable" v-else>
          <a class="navbar-link">{{ $store.state.user.username }}</a>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="/userprofile">My Profile</router-link>
            <hr class="navbar-divider">
            <a class="navbar-item has-text-danger" @click="logOut">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
      return {
        activator: false
      }
    },
    methods: {
      logOut() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        this.$store.state.user = ""
        this.$store.dispatch('authCheck')
        this.$store.dispatch('userLoggedIn')
        this.$router.push('Login')
      },
      makeBurger () {
        this.activator = !this.activator
        return this.activator
      }
    }
}
</script>

<style>
.navbar-middle{
  width: 50%;
}
.navbar-middle p {
  width: 70%;
}

</style>