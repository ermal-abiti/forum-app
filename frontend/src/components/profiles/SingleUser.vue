<template>
<div v-if="user.username">
  <div class='columns'>
  <div class='container profile'>
    <!-- Profile section -->
    <div class='section profile-heading'>
      <div class='columns is-mobile is-multiline'>
        <!-- Profile content -->
        <div class='column is-2'>
          <span class='header-icon user-profile-image'>
            <img class="imgprofile" src='./avatarr.png' >
          </span>
        </div>
        <!-- Name and Bio -->
        <div class='column is-4-tablet is-10-mobile name'>
          <p>
            <span class='title is-bold'>{{ user.fullName }}</span>
            
          </p>
          <p class='tagline'>
           @{{ user.username }}
          </p>
          <div v-if="!(this.$store.state.user.username == user.username) && this.$store.state.loggedIn">
            <button class="button is-info mt-5" v-if="isFollowing">
                following
            </button>
            <button @click="followUser" class="button is-outlined is-info mt-5" v-else>
                follow
            </button>

          </div>
        </div>
        <!-- Profile Data -->
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ user.followers.length }}</p>
          <p class='stat-key'>Followers</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ user.following.length }}</p>
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
            <div class='box' style='border-radius: 0px;' v-for="post in user.posts" v-bind:key="post._id">
                  <div class="media-content">
                    <div class="content">
                      <p>
                          <strong>{{ user.fullName }}</strong> <small>@{{ user.username }}</small> <small>{{ post.dateCreated }}</small>
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

<div v-else class="container mt-5">
    <article class="message is-danger">
    <div class="message-body">
        User not found
    </div>
    </article>
</div>

</template>

<script>
import axios from "axios"
import getCookie from '../../cookies/getCookie'
// import getCookie from '../../cookies/getCookie.js'

export default {
  name: 'SingleUser',
  data() {
    return {
        user: {},
        isFollowing: false,
        showPosts: true,
        showLikes: false,
        
    }
  },
  computed: {
      isFollowingCom() {
        if (this.$store.state.user.following.includes(this.user._id)) {
            return true
        }
          return false
      }
  },
  methods: {
      async isFollowingCheck() {
        if (this.$store.state.user.following.includes(this.user._id)) {
            console.log("Checkpoint 1");
            this.isFollowing = true
        }
        else {
            this.isFollowing = false

        }
        

      },
    async getUser() {
        try {
          const result = await axios.get(`http://localhost:5050/api/users/getByUsername?username=${this.$route.query.username}`)
          this.user = result.data
        }
        catch(err) {
            this.user = {}
            console.log(err);
        }
    },
    async followUser(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5050/api/users/follow", 
            {
                following: this.user._id
            },{
                headers: {
                    token: getCookie('token')
                }
            })
            await this.getUser()
            await this.$store.dispatch('userLoggedIn')
            await this.isFollowingCheck()
        }
        catch(err) {
            console.log(err);
        }
        this.isFollowing = true
    },
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
  async mounted() {
      this.$store.dispatch('userLoggedIn')
      await this.getUser()
      await this.isFollowingCheck()
      console.log(this.isFollowing);
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