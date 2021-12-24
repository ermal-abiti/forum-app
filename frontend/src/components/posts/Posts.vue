<template>
    <div class="container mt-5">
        <article class="media" v-for="post in this.$store.state.posts" v-bind:key="post._id">
            <figure class="media-left">
                <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </figure>
            
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>{{ post.creator.fullName }}</strong> <small>@johnsmith</small> <small>{{ post.dateCreated.slice(0,10) }}</small>
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
</template>

<script>
export default {
    name: 'Posts',
    components: {
    },
    mounted() {
        this.$store.dispatch('getAllPosts')
    }
}
</script>

<style>

</style>