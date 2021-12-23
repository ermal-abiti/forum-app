<template>
  <div class="container">
    {{ $store.state.loggedIn }}
    <p>{{ aPo }}</p>
    <button @click="authCheck">switch</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Home',
  components: {
  },
  computed: mapGetters([
    'aPo'
  ]),
  methods: mapActions([
    'authCheck'
  ])
}
</script>
