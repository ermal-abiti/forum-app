<template>
    <div class="hero-body">
        <div class="container mt-5">
            <div class="columns mt-5">
                <div class="card">
                    <div class="card-content">
                        <p class="title">Not a member ?</p>
                        <p class="subtitle">Join the largest community for discussions...</p>
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
                                        <input id="username" name="username" type="text" placeholder="Username" class="input" required="" />
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label" for="username">Full Name</label>
                                    <div class="control">
                                        <input id="fullName" name="fullName" type="text" placeholder="Full Name" class="input" required="" />
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label" for="username">Email</label>
                                    <div class="control">
                                        <input id="email" name="email" type="text" placeholder="Email" class="input" required="" />
                                    </div>
                                </div>

                                <!-- Password input-->
                                <div class="field">
                                    <label class="label" for="password">Password</label>
                                    <div class="control">
                                        <input id="password" name="password" type="password" placeholder="Password" class="input" required="" />
                                    </div>
                                </div>

                                <!-- Button -->
                                <div class="field mt-5">
                                    <label class="label" for="registerbtn"></label>
                                    <div class="control">
                                        <button id="registerbtn" name="registerbtn" class="button is-fullwidth is-outlined is-success">Register</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    methods: {
        loginMethod(e) {
            e.preventDefault();
            try {
                axios
                    .post(process.env.VUE_APP_API_URL + '/users/register', {
                        username: e.target.username.value,
                        fullName: e.target.fullName.value,
                        email: e.target.email.value,
                        password: e.target.password.value,
                    })
                    .then((res) => {
                        console.log(res.data);
                        document.cookie = `token=${res.data.token}`;
                        document.cookie = `userid=${res.data.userid}`;
                        this.$store.dispatch('authCheck');
                        this.$store.dispatch('userLoggedIn');
                    });
                this.$router.push({ path: '/' });
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style></style>
