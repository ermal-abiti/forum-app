<template>
    <div class="hero-body">
        <div class="columns is-centered">
            <div class="column is-9 ">
                
                <add-post v-if="this.$store.state.loggedIn" />
                <article class="media mt-5" v-for="post in this.$store.state.posts" v-bind:key="post._id">
                    
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="../profiles/default-avatar.png" />
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
                                        <ImageView :img_url="post.image_url" width="200"/>
                                </div>
                                
                                <span>{{ post.content }}</span>
                                
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
        </div>
    </div>
</template>

<script>
import AddPost from './AddPost.vue';
import getCookie from '../../cookies/getCookie.js';
import axios from 'axios';
import ImageView from '../parts/ImageView.vue';

export default {
    name: 'Posts',
    components: {
        AddPost,
        ImageView
    },
    mounted() {
        this.$store.dispatch('getAllPosts');
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
};
</script>

<style>

</style>
