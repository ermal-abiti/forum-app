<template>
    <div class="container mt-5">
        <article class="message is-danger" v-if="this.$route.query.invalid">
            <div class="message-body">
                Check username and password
            </div>
        </article>
        <div class="columns mt-5">
            <div class="column is-one-third"></div>
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-content title">
                        <p class="title">Already a member ?</p>
                        <p class="subtitle">Log In to continue...</p>
                    </div>
                    <div class="card-content">

                        <form class="form-horizontal" @submit="loginMethod">
                            <fieldset>

                            <!-- Form Name -->
                            <legend></legend>

                            <!-- Text input-->
                            <div class="field">
                            <label class="label" for="username">Username</label>
                            <div class="control">
                                <input v-model="username"  id="username" name="username" type="text" placeholder="Username" class="input " required="">
                                
                            </div>
                            </div>

                            <!-- Password input-->
                            <div class="field">
                            <label class="label" for="password">Password</label>
                            <div class="control">
                                <input v-model="password"  id="password" name="password" type="password" placeholder="Password" class="input " required="">
                                
                            </div>
                            </div>

                            <!-- Button -->
                            <div class="field mt-5">
                            <label class="label" for="loginbtn"></label>
                            <div class="control">
                                <button id="loginbtn" name="loginbtn" class="button is-fullwidth is-outlined is-success">Login</button>
                            </div>
                            </div>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column is-one-third"></div>
        </div>

    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Login",
    methods: {
        loginMethod(e) {
            e.preventDefault();
            try {
                console.log("process.env.apiurl: ", process.env.VUE_APP_API_URL);
                axios.post(process.env.VUE_APP_API_URL + "/users/login", 
                    {
                    username: e.target.username.value, 
                    password: e.target.password.value
                })
                .then(res => {
                    // console.log(res.data.token);
                    document.cookie = `token=${res.data.token}`
                    document.cookie = `userid=${res.data.userid}`
                    this.$store.dispatch('authCheck')
                    this.$store.dispatch('userLoggedIn')
                    this.$store.state.posts = []
                    this.$store.dispatch('getFollowingsPosts')

                    this.$router.push({path:'/'})
                })
                .catch(err => {
                    console.log(err.message);
                    this.username = ''
                    this.password = ''
                    this.$router.push({name:'Login', query: {invalid: "true"}})
                })

            }
            catch(err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>