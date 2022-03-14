<template>
    <div class="section">
        <h1>{{ titleD }}</h1>
        <div class="card">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Post Content</th>
                        <th>Posted By</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" v-bind:key="post._id">
                        <td>{{ post._id }}</td>
                        <td>{{ post.content }}</td>
                        <td>{{ post.creator.username }}</td>
                        <td>{{ post.dateCreated }}</td>

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
    name: 'DashboardPosts',
    props: ['titleD'],
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        async getAllPosts() {
            this.posts = [];
            const result = await axios.get(process.env.VUE_APP_API_URL + '/posts', {
                headers: {
                    token: getCookie('token'),
                },
            });
            this.posts = result.data;
        },
    },
    mounted() {
        this.getAllPosts();
    },
};
</script>

<style></style>
