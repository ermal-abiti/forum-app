<template>
    <div class="container mt-5">
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
                    this.$store.dispatch('userLoggedIn')
                })
                this.$router.push({path:'/'})

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