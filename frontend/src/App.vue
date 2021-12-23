<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/parts/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('authCheck')
  }
}
</script>


<style>

</style>
