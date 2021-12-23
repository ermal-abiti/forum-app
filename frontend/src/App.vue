<template>
  <div>
    <navbar/>
    <div class="container mt-5">
      <div class="list-group" v-if="posts.length > 0">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="post in posts" v-bind:key="post._id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ post.title }}</h5>
            <small>{{ post.dateCreated.slice(0, 10) }}</small>
          </div>
          <p class="mb-1">{{ post.content }}</p>
          <small>Author Name (implementing soon...)</small>
        </a>
      </div>
      <p v-else>No posts yet! Use postman to add some posts...</p>
    </div>

    <login :loginMethod="loginMethod"/>
  
  </div>
</template>


<script>
import Navbar from "./components/parts/Navbar.vue"
import Login from "./components/auth/Login.vue"
import axios from "axios"

export default {
  name: 'App',
  components: {
    Navbar,
    Login
  },
  data() {
    return {
      posts: [],  
    }
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },

    loginMethod(e) {
      e.preventDefault();
      axios.post("http://localhost:5050/api/users/login", 
        {
          username: e.target.username.value, 
          password: e.target.password.value
      })
      .then(res => {
        // console.log(res.data.token);
        document.cookie = `token=${res.data.token}`
        document.cookie = `userid=${res.data.userid}`
        console.log(this.getCookie('token'));
      })
    }

  },
  mounted: function() {
    axios.get("http://localhost:5050/api/posts/", {
      headers: {
        'authorization': this.getCookie('token')
      }
    }
    )
      .then(response => {
        this.posts = response.data;
      })
  } 
}
</script>

<style>

</style>
