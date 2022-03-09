<template>
    <div class="section">
        <h1>{{ titleD }}</h1>
        <div class="card">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" v-bind:key="user._id">
                        <td>{{ user._id }}</td>
                        <td>{{ user.fullName }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>

                        <td>
                            <span class="icon">
                                <i class="fa fa-pencil-square"></i>
                            </span>
                            <span class="icon">
                                <i class="fa fa-trash"></i>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
    </div>
</template>

<script>
import axios from 'axios';
import getCookie from '../../cookies/getCookie';

export default {
    name: 'DashboardUsers',
    props: ['titleD'],
    data() {
        return {
            users:[]
        }
    },
    methods: {
        async getAllUsers() {
            this.users = [];
            const result = await axios.get(process.env.VUE_APP_API_URL + '/dashboard/users', {
            headers: {
                token: getCookie('token'),
            },
            })
            this.users = result.data
        }
    },
    mounted() {
        this.getAllUsers();
    }
}
</script>

<style>

</style>