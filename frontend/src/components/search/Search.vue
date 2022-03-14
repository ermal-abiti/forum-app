<template>
    <div class="hero-body">
        <h1 class="title is-1">Search Results</h1>

        <div>
            <h3 class="title is-3">Users result for "{{ $route.query.text }}":</h3>
            <div class="container">
                <div class="box" v-for="user in users" :key="user._id">
                    <p>
                        <a :href="`/profile?username=${user.username}`" class="has-text-black"
                            ><b>{{ user.fullName }}</b></a
                        >
                    </p>
                    <p>
                        <a :href="`/profile?username=${user.username}`" class="has-text-info">@{{ user.username }}</a>
                    </p>
                </div>
            </div>
        </div>

        <div>
            <h3 class="title is-3">Posts result for "{{ $route.query.text }}":</h3>
            <article class="media mt-5" v-for="post in this.posts" v-bind:key="post._id">
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

        <div>
            <h3 class="title is-3">Comments result for "{{ $route.query.text }}":</h3>
            <article class="media" v-for="comment in comments" v-bind:key="comment._id">
                <figure class="media-left">
                    <p class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" />
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{{ comment.creator.fullName }}</strong>
                            <br />
                            {{ comment.content }}
                            <br />
                            <small
                                ><a class="mr-2"><i class="fas fa-caret-up"></i> </a><a class="mr-2"><i class="fas fa-caret-down"></i></a><a><i class="fas fa-comment-dots"></i></a> ·
                                {{ comment.dateCreated.split('T').join(' ').slice(0, 16) }}</small
                            >
                        </p>
                    </div>
                </div>
                <div class="media-right" v-if="comment.creator._id === $store.state.user._id">
                    <button class="delete" @click.prevent="deleteComment(comment._id)">s</button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ImageView from '../parts/ImageView.vue';

export default {
    name: 'Search',
    components: {
        ImageView,
    },
    data() {
        return {
            posts: [],
            users: [],
            comments: [],
        };
    },
    async mounted() {
        const result = await axios.get(process.env.VUE_APP_API_URL + '/search?text=' + this.$route.query.text);
        this.posts = result.data.posts;
        this.users = result.data.users;
        this.comments = result.data.comments;
    },
};
</script>
