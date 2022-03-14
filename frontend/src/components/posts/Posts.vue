<template>
    <div class="hero-body">
        <div :class="modalActive ? 'modal is-active' : 'modal'">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close" @click.prevent="showFormModal('close')"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label" for="content">Content</label>
                        <div class="control">
                            <textarea v-model="contentUpdate" class="textarea" id="content" placeholder="What's on your mind?" name="content"></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click.prevent="updatePost(postIdUpdate)">Save changes</button>
                    <button class="button" @click.prevent="showFormModal('close')">Cancel</button>
                </footer>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-9">
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
                                <ImageView :img_url="post.image_url" width="200" />
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
                        <button class="button is-white" @click.prevent="showFormModal('show', post.content, post._id)">
                            <span class="icon is-small"><i class="fa-solid fa-pencil"></i></span>
                        </button>
                        <button class="button is-white" @click.prevent="deletePost(post._id)">
                            <span class="icon is-small"><i class="fa-solid fa-trash"></i></span>
                        </button>
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
    data() {
        return {
            modalActive: false,
            contentUpdate: '',
            postIdUpdate: '',
        };
    },
    components: {
        AddPost,
        ImageView,
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
        async updatePost(id) {
            let data = {
                content: this.contentUpdate,
            };

            axios
                .put(process.env.VUE_APP_API_URL + '/post/' + id, data, {
                    headers: {
                        userid: getCookie('userid'),
                        token: getCookie('token'),
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.contentUpdate = '';
                    this.$store.dispatch('getAllPosts');
                    this.modalActive = false;
                });
        },
        async showFormModal(modalState, content = null, id = null) {
            if (modalState === 'close') {
                this.modalActive = false;
                this.contentUpdate = '';
                this.postIdUpdate = '';
            } else if (modalState === 'show') {
                this.modalActive = true;
                this.contentUpdate = content;
                this.postIdUpdate = id;
            }
        },
    },
};
</script>

<style></style>
