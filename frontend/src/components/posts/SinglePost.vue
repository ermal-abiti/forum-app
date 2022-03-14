<template> 
    <div class="container mt-5" v-if="post.content">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <!-- <p> -->
                        <strong>{{ post.creator.fullName }}</strong>
                        <div v-if="post.image_url">
                                <ImageView :img_url="post.image_url" width="200"/>
                        </div>
                        <br />
                        {{ post.content }}
                        <br />
                        <small
                            ><a class="mr-2"><i class="fas fa-caret-up"></i> </a><a class="mr-2"><i class="fas fa-caret-down"></i></a><a><i class="fas fa-comment-dots"></i></a> ·
                            {{ post.dateCreated.split('T').join(' ').slice(0, 16) }}
                        </small>
                    <!-- </p> -->
                </div>

                <article class="media" v-for="comment in post.comments" v-bind:key="comment._id">
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
        </article>
        <br />
        <div class="media-content">
            <form @submit.prevent="onSubmit">
                <div class="field">
                    <p class="control">
                        <textarea class="textarea" placeholder="Reply to this post..." v-model="replyText"></textarea>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button" name="submitReplyBtn" :disabled="disabledReplyButton">Reply</button>
                    </p>
                </div>
            </form>
        </div>
    </div>

    <div v-else-if="loading">Loading...</div>

    <div v-else>Post not found...</div>
</template>

<script>
import axios from 'axios';
import getCookie from '../../cookies/getCookie.js';
import ImageView from '../parts/ImageView.vue';

export default {
    name: 'SinglePost',
    components: {
        ImageView,
    },
    data() {
        return {
            post: {},
            replyText: '',
            disabledReplyButton: false,
            loading: false,
        };
    },
    methods: {
        async getPost() {
            try {
                const result = await axios.get(process.env.VUE_APP_API_URL + '/post?postid=' + this.$route.query.postid);
                this.post = result.data;
            } catch (err) {
                this.post = {};
                console.log(err);
            } finally {
                this.loading = false;
            }
        },
        async deleteComment(id) {
            try {
                if (confirm('Are you sure you want to delete this comment ? ')) {
                    await axios.delete(process.env.VUE_APP_API_URL + '/comment?commentid=' + id, {
                        headers: {
                            userid: getCookie('userid'),
                            token: getCookie('token'),
                        },
                    });
                    await this.getPost();
                }
            } catch (error) {
                alert(error.message);
            }
        },
        async onSubmit() {
            this.disabledReplyButton = true;
            try {
                await axios.post(
                    process.env.VUE_APP_API_URL + '/comment?postid=' + this.$route.query.postid,
                    {
                        content: this.replyText,
                    },
                    {
                        headers: {
                            userid: getCookie('userid'),
                            token: getCookie('token'),
                        },
                    },
                );
                await this.getPost();
            } catch (error) {
                console.log(error.message);
            } finally {
                this.replyText = '';
                this.disabledReplyButton = false;
            }
        },
    },
    async mounted() {
        this.loading = true;
        this.getPost();
    },
};
</script>
