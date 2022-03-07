<template>
<div v-if="$store.state.loggedIn">
  <div class='columns'>
  <div class='container profile'>
    <!-- Profile section -->
    <div class='section profile-heading'>
      <div class='columns is-mobile is-multiline'>
        <!-- Profile content -->
        <div class='column is-2'>
          <span class='header-icon user-profile-image'>
            <img class="imgprofile" >
          </span>
        </div>
        <!-- Name and Bio -->
        <div class='column is-4-tablet is-10-mobile name'>
          <p>
            <span class='title is-bold'>{{ $store.state.user.fullName }}</span>
            
          </p>
          <p class='tagline'>
           @{{ $store.state.user.username }}
          </p>
        </div>
        <!-- Profile Data -->
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ $store.state.user.followers.length }}</p>
          <p class='stat-key'>Followers</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ $store.state.user.following.length }}</p>
          <p class='stat-key'>Following</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>5</p>
          <p class='stat-key'>Likes</p>
        </div>
      </div>
    </div>
    <!-- Interactions data -->
    <div class='profile-options is-fullwidth'>
      <div class='tabs is-fullwidth is-medium'>
        <ul>
          <li class='link'>
            <a @click="showThePosts">
              <span class='icon'>
                <i class='fa fa-list'></i>
              </span>
              <span>Posts</span>
            </a>
          </li>
          <li class='link'>
            <a @click="showTheLikes">
              <span class='icon'>
                <i class='fa fa-thumbs-up'></i>
              </span>
              <span>Likes</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Posts -->
      <div v-if="showPosts">
            <div class='box' style='border-radius: 0px;' v-for="post in $store.state.user.posts" v-bind:key="post._id">
                  <div class="media-content">
                    <div class="content">
                      <p>
                          <strong>{{ $store.state.user.fullName }}</strong> <small>@{{ $store.state.user.username }}</small> <small>{{ post.dateCreated }}</small>
                          <br>
                          {{ post.content }}
                      </p>
                    </div>
                    <!-- Icons -->
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
                    </div>

            </div>
      </div>
    
    </div>
  </div>
</div>

<div v-else>
  You are not authenticated
</div>
</template>

<script>
// import axios from "axios"
// import getCookie from '../../cookies/getCookie.js'

export default {
  name: 'UserProfiles',
  data() {
    return {
      showPosts: true,
      showLikes: false,
    }
  },
  methods: {
    showThePosts(e) {
      e.preventDefault()
      this.showPosts = true
      this.showLikes = false

    },
    showTheLikes(e) {
      e.preventDefault()
      this.showLikes = true
      this.showPosts = false

    },
  },
  mounted() {
    this.$store.dispatch('userLoggedIn')
    console.log(this.$store.state.user);
  }
}
</script>

<style>

.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}

.section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}

.container.profile {
  margin-top: 1%;
}

.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}

.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}

.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #F1F1F1;
}

</style>