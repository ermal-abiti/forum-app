<template>
    <form class="form-horizontal" @submit="addPost">
        <fieldset>
            <!-- Form Name -->
            <legend></legend>

            <!--
-->
            <!-- Textarea -->
            <div class="field">
                <label class="label" for="content">Content</label>
                <div class="control">
                    <textarea v-model="content" class="textarea" id="content" placeholder="What's on your mind?" name="content"></textarea>
                </div>
            </div>

            <!-- <div class="field">
                <label class="label" for="image">Image</label>
                <div class="control"> -->
                    <input type="file" name="image" accept="image/png">
                <!-- </div>
            </div> -->

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
import getCookie from '../../cookies/getCookie.js';
import axios from 'axios';

export default {
    name: 'AddPost',
    data() {
        return {
            title: '',
            content: '',
            image: '',
        };
    },
    methods: {
        async addPost(e) {
            e.preventDefault();
            // let data = {
            //     content: e.target.content.value,
            // };
            let data = new FormData();
            data.append('content', e.target.content.value);
            data.append('image', e.target.image.files[0]);
            // data.append('image', e.target.image.files[0],  e.target.image.files[0].name);
            console.log(e.target);
            console.log(e.target.image.value);
            console.log(e.target.image.files[0])
            
            axios
                .post(process.env.VUE_APP_API_URL + '/addpost', data, {
                    headers: {
                        userid: getCookie('userid'),
                        token: getCookie('token'),
                        'Content-Type' : 'multipart/form-data',
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.content = '';
                    this.$store.dispatch('getAllPosts');
                });
        },
    },
};
</script>

<style>
.control {
    text-align: end;
}
</style>
