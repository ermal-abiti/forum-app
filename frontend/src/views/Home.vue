<template>
  <div class="container mt-5" v-if="this.$store.state.loggedIn">
        <!-- <add-post v-if="this.$store.state.loggedIn"/> -->
        <article class="media mt-5" v-for="post in this.$store.state.followingPosts" v-bind:key="post._id">
            <figure class="media-left">
                <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </figure>
            
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>{{ post.creator.fullName }}</strong> <small>@{{ post.creator.username }}</small> <small>{{ post.dateCreated.slice(0,10) }}</small>
                    <br>
                    {{ post.content }}
                </p>
                </div>
                <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                </div>
                </nav>
            </div>
            <div class="media-right">
                <button class="delete"></button>
            </div>
        </article>
  </div>
  <div class="container mt-5" v-else>
    <h2>Featured</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  async mounted() {
    await this.$store.dispatch('authCheck');
    await this.$store.dispatch('getFollowingsPosts');
  },
}
</script>
