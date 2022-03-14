<template>
    <div id="app">
        <navbar />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Navbar from './components/parts/Navbar.vue';
import Footer from './components/parts/Footer.vue';

export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
    },
    async created() {
        await this.$store.dispatch('setToken');
        await this.$store.dispatch('authCheck');
        await this.$store.dispatch('userLoggedIn');
    },
};
</script>

<style>
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

#app {
    flex: 1;
    display: flex;
    flex-direction: column;
}

footer {
    margin-top: auto;
}
</style>
