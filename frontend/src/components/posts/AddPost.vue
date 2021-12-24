<template>
  <form class="form-horizontal" @submit="addPost">
<fieldset>

<!-- Form Name -->
<legend></legend>

<!-- Text input-->
<div class="field">
  <label class="label" for="title">Title</label>
  <div class="control">
    <input v-model="title" id="title" name="title" type="text" placeholder="Whats on your mind..." class="input " required="">
    
  </div>
</div>

<!-- Textarea -->
<div class="field">
  <label class="label" for="content">Content</label>
  <div class="control">                     
    <textarea v-model="content" class="textarea" id="content" name="content"></textarea>
  </div>
</div>

<!-- Button -->
<div class="field">
  <label class="label" for="addpostBtn"></label>
  <div class="control">
    <button id="addpostBtn" name="addpostBtn" class="button is-info">Add Post...</button>
  </div>
</div>

</fieldset>
</form>

</template>

<script>
import getCookie from "../../cookies/getCookie.js"
import axios from "axios"

export default {
    name:'AddPost',
    data() {
        return {
            title: "",
            content: "",
        }
    },
    methods: {
        async addPost(e) {
            e.preventDefault()
            let data = {
                title: e.target.title.value,
                content: e.target.content.value,
            }
            axios.post("http://localhost:5050/api/addpost", data,  {
                headers: {
                    'userid': getCookie('userid'),
                    'token': getCookie('token'),
                }
            })
            .then(res=>{
                console.log(res);
                this.title = ""
                this.content = ""
                this.$store.dispatch('getAllPosts')
            })
        }
    }

}
</script>

<style>

</style>