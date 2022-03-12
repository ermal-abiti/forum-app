<template>
    <div id="app">
        <navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/parts/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar,
    },
    async created() {
        await this.$store.dispatch('setToken');
        await this.$store.dispatch('authCheck');
        await this.$store.dispatch('userLoggedIn');
    },
};
</script>

<style></style>
