<template>
    <div v-if="this.$store.state.user.role === 'admin'">
        <div id="app">

            <section class="main-content columns is-fullheight">
                <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                    <p class="menu-label is-hidden-touch">Navigation</p>
                    <ul class="menu-list">
                        <li>
                            <a @click="showPageChange('users')" class="">
                                <span class="icon"><i class="fa fa-user"></i></span> Users
                            </a>
                            <a @click="showPageChange('posts')" class="">
                                <span class="icon"><i class="fa fa-id-card"></i></span> Posts
                            </a>
                        </li>
                    </ul>
                </aside>

                <div class="container column is-10">
                    <DashboardUsers titleD="All Users" v-if="showPage == 'users'"/>
                    <DashboardPosts titleD="All Posts" v-if="showPage == 'posts'"/>
                </div>
            </section>
        </div>
    </div>
    <div v-else-if="this.$store.state.user.role === 'user'">You do not have privileges to access this page!</div>
    <div v-else>
        <div>
            <p>Loading ...</p>
        </div>
    </div>
</template>

<script>
import DashboardUsers from './DashboardUsers.vue'
import DashboardPosts from './DashboardPosts.vue'
export default {
    name: 'dashboard',
    components: {
        DashboardUsers,
        DashboardPosts
    },
    data() {
        return {
            users: [],
            showPage:'users',
        };
    },
    methods: {
        async checkStore() {
            try {
                await this.$store.dispatch('authCheck');
                await this.$store.dispatch('userLoggedIn');
            } catch (err) {
                console.log(err.message);
            }
        },
        showPageChange(page) {
            this.showPage = page
        }
    },
    async mounted() {
        this.users = [];

        await this.checkStore();
    },
};
</script>

<style></style>
