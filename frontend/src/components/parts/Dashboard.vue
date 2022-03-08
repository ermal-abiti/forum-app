<template>
  <div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th>Id</th>
      <th>FullName</th>
      <th>Username</th>
      <th>Email</th>
      
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td v-for="user in this.$store.state.user" v-bind:key="user.user_id">{{user}}</td>
     </tr>
  </tbody>
</table>
</div>
</template>

<script>
export default {
name: 'dashboard'
}
</script>

<style>

</style>