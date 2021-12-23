<template>
  <nav class="navbar is-dark">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/#/">
          Forum App
        </a>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/about" class="navbar-item">About</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" v-if="!($store.state.loggedIn)">
              <p class="control">
                <a class="bd-tw-button button">
                  
                  <span>
                    <router-link to="/register" class="has-text-black">Register</router-link>
                  </span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" >
                  <span>
                    <router-link to="/login" class="has-text-white">Login</router-link>
                  </span>
                </a>
              </p>
            </div>

            <div class="field is-grouped" v-else>
              <p class="control">
                <button class="bd-tw-button button" @click="logOut">
                  
                  <span>
                    Log Out
                  </span>
                </button>
              </p>
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
        this.$store.dispatch('authCheck')
        this.$router.push('Login')
      }
    }
}
</script>

<style>

</style>