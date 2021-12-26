<template>
  <nav class="navbar is-dark">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          Forum App
        </router-link>
      </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <!-- <router-link class="navbar-item" to="/">Home</router-link> -->
      <router-link class="navbar-item" to="/posts">Posts</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
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
    methods: {
      logOut() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        this.$store.state.user = ""
        this.$store.dispatch('authCheck')
        this.$store.dispatch('userLoggedIn')
        this.$router.push('Login')
      }
    }
}
</script>

<style>

</style>