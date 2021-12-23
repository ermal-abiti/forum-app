<template>
    <div class="container mt-5">
        <h1 class="title has-text-centered">Log In</h1>
        <div class="columns mt-5">
            <div class="column is-one-third"></div>
            <div class="column is-one-third">
                <form class="form-horizontal" @submit="loginMethod">
                    <fieldset>

                    <!-- Form Name -->
                    <legend></legend>

                    <!-- Text input-->
                    <div class="field">
                    <label class="label" for="username">Username</label>
                    <div class="control">
                        <input id="username" name="username" type="text" placeholder="Username" class="input " required="">
                        
                    </div>
                    </div>

                    <!-- Password input-->
                    <div class="field">
                    <label class="label" for="password">Password</label>
                    <div class="control">
                        <input id="password" name="password" type="password" placeholder="Password" class="input " required="">
                        
                    </div>
                    </div>

                    <!-- Button -->
                    <div class="field">
                    <label class="label" for="loginbtn"></label>
                    <div class="control">
                        <button id="loginbtn" name="loginbtn" class="button is-success">Login</button>
                    </div>
                    </div>

                    </fieldset>
                </form>
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
                axios.post("http://localhost:5050/api/users/login", 
                    {
                    username: e.target.username.value, 
                    password: e.target.password.value
                })
                .then(res => {
                    // console.log(res.data.token);
                    document.cookie = `token=${res.data.token}`
                    document.cookie = `userid=${res.data.userid}`
                    this.$store.dispatch('authCheck')
                })
                this.$router.push('home')

            }
            catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>