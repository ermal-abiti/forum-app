<template>
    <div>
  <div id="app">
  <div class="container">
    <div class="nav-right nav-menu">
      <a class="nav-item is-tab is-hidden-tablet">
        <span class="icon"><i class="fa fa-home"></i></span> Dashboard
      </a>
  
    </div>
  </div>

<section class="main-content columns is-fullheight">
  
  <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <ul class="menu-list">
      <li>
        <a href="#" class="">
          <span class="icon"><i class="fa fa-id-card"></i></span> Dashboard
        </a>
      </li>
    </ul> 
  </aside>

  <div class="container column is-10">
    <div class="section">

      <div class="card">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
         <thead>
          <tr>
            <th>ID</th>
            <th>Name </th>
            <th>Username</th>
            <th>Email</th>
            <th>?</th>
            <th>Actions</th>
          </tr>
        </thead>
          <tbody>
            <tr>
            <td v-for="user in this.$store.state.user" v-bind:key="user.user_id">{{user}}</td>
            
            <td>
              <span class="icon">
                  <i class="fa fa-pencil-square"></i>
                </span>
                <span class="icon">
                  <i class="fa fa-trash"></i>
                </span>
            </td>
           </tr> 
          </tbody>
        </table>
      </div>
      <br />
    </div>
  </div>
  
</section>
    
  </div>
    </div>
</template>

<script>
    export default {
      name: "dashboard",
    }
</script>


<style>

</style>