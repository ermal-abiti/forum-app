<template>
<div class="container mt-5" v-if="post.content">
    <article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{ post.creator.fullName }}</strong>
        <br>
        {{ post.content}}
        <br>
        <small><a class="mr-2"><i class="fas fa-caret-up"></i> </a><a class="mr-2"><i class="fas fa-caret-down"></i></a><a><i class="fas fa-comment-dots"></i></a> · {{ post.dateCreated.split("T").join(" ").slice(0, 16) }} </small>
      </p>
    </div>


    <article class="media" v-for="comment in post.comments" v-bind:key="comment._id">
      <figure class="media-left">
        <p class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.creator.fullName }}</strong>
            <br>
              {{ comment.content }}
            <br>
           <small><a class="mr-2"><i class="fas fa-caret-up"></i> </a><a class="mr-2"><i class="fas fa-caret-down"></i></a><a><i class="fas fa-comment-dots"></i></a> · {{ comment.dateCreated.split("T").join(" ").slice(0, 16) }}</small>
          </p>
        </div>
      </div>
    </article>
  </div>
</article>
<br>
<div class="media-content">
          <div class="field">
            <p class="control">
              <textarea class="textarea" placeholder="Komento..."></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button">Posto komentin</button>
            </p>
          </div>
        </div>
</div>

<div v-else-if="loading">
  Loading...
</div>

<div v-else >
Post not found...
</div>
</template>

<script>
import axios from "axios"

export default {
  name: 'SinglePost',
  data() {
    return {
      post: {},
      loading: false
    }
  },
  methods: {
    async getPost() {
      try {
        const result = await axios.get(process.env.VUE_APP_API_URL + '/post?postid=' + this.$route.query.postid)
        this.post = result.data
      }
      catch(err) {
        this.post = {}
        console.log(err);
      }
      finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    this.loading = true
    this.getPost()
  }
}
</script>
