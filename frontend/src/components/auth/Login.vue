<template>
  <form @submit="loginMethod">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <input type="submit" name="submitbtn" value="Submit">
    
    </form>
</template>

<script>
export default {
    name: "Login",
    props: {
        loginMethod: {type: Function },
    }
}
</script>

<style>

</style>