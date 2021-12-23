<template>
  <div>
    <navbar/>
    <home/>
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

    <form @submit="loginMethod">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <input type="submit" name="submitbtn" value="Submit">
    
    </form>
  
  </div>
</template>


<script>
import Navbar from "./components/parts/Navbar.vue"
import home from "./components/parts/Home.vue"
import axios from "axios"

export default {
  name: 'App',
  components: {
    Navbar,
    home,
  },
  data() {
    return {
      posts: [],  
    }
  },
  methods: {
    loginMethod(e) {
      e.preventDefault();
      axios.post("http://localhost:5050/api/users/login", {username: e.target.username.value, password: e.target.password.value})
      .then(res => {
        // console.log(res.data.token);
        document.cookie = `token=${res.data.token}`
      })
    }
  },
  mounted: function() {
    axios.get("http://localhost:5050/api/posts/")
      .then(response => {
        this.posts = response.data;
      })
  } 
}
</script>

<style>

</style>
