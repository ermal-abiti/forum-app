<template>
    <div class="hero-body mt-5" v-if="this.$store.state.loggedIn">
        <!-- <add-post v-if="this.$store.state.loggedIn"/> -->
        <article class="media mt-5" v-for="post in this.$store.state.followingPosts" v-bind:key="post._id">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="../components/profiles/default-avatar.png" />
                </p>
            </figure>

            <div class="media-content">
                <div class="content">
                    <!-- <p> -->
                    <strong>{{ post.creator.fullName }}</strong>
                    <small
                        ><a :href="`/profile?username=${post.creator.username}`">@{{ post.creator.username }}</a></small
                    >
                    <small>{{ post.dateCreated.slice(0, 10) }}</small>
                    <br />
                    <div v-if="post.image_url">
                        <ImageView :img_url="post.image_url" width="200" />
                    </div>
                    {{ post.content }}
                    <!-- </p> -->
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <span class="mr-1">{{ post.comments.length }}</span>
                        <a class="level-item" :href="`/singlepost?postid=${post._id}`">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-heart"></i></span>
                        </a>
                    </div>
                </nav>
            </div>
            <div class="media-right" v-if="post.creator.username === $store.state.user.username">
                <button class="delete" @click.prevent="deletePost(post._id)">s</button>
            </div>
        </article>
    </div>
    <div class="hero-body mt-5" v-else>
        <h1 class="title is-1">Featured</h1>

        <article class="media mt-5" v-for="post in __posts" v-bind:key="post._id">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="../components/profiles/default-avatar.png" />
                </p>
            </figure>

            <div class="media-content">
                <div class="content">
                    <!-- <p> -->
                    <strong>{{ post.creator.fullName }}</strong>
                    <small
                        ><a :href="`/profile?username=${post.creator.username}`">@{{ post.creator.username }}</a></small
                    >
                    <small>{{ post.dateCreated.slice(0, 10) }}</small>
                    <br />
                    <div v-if="post.image_url">
                        <ImageView :img_url="post.image_url" width="200" />
                    </div>
                    {{ post.content }}
                    <!-- </p> -->
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <span class="mr-1">{{ post.comments.length }}</span>
                        <a class="level-item" :href="`/singlepost?postid=${post._id}`">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-heart"></i></span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
import axios from 'axios';
import getCookie from '../cookies/getCookie.js';
import ImageView from '../components/parts/ImageView.vue';

export default {
    name: 'Home',
    components: {
        ImageView,
    },
    computed: {
        __posts() {
            return this.$store.state.posts.length <= 3 ? this.$store.state.posts : this.$store.state.posts.slice(0, 3);
        },
    },
    methods: {
        async deletePost(id) {
            if (confirm('Are you sure u wanna delete this post ?')) {
                await axios.delete(process.env.VUE_APP_API_URL + `/post/${id}`, {
                    headers: {
                        token: getCookie('token'),
                    },
                });
                this.$store.dispatch('getAllPosts');
            }
        },
    },
    async mounted() {
        await this.$store.dispatch('authCheck');
        await this.$store.dispatch('getFollowingsPosts');
        await this.$store.dispatch('getAllPosts');
    },
};
</script>
