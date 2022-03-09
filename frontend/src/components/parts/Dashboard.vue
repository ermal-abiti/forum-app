<template>
  <div v-if="this.$store.state.user.role === 'admin'">
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
            <br>
          </div>
        </div>

        
        
      </section>
    
      </div>
    </div>
  <div v-else-if="this.$store.state.user.role === 'user'">
    You do not have privileges to access this page!
  </div>
  <div v-else>
      <div>
        <p>Loading ...</p>
      </div>
 </div>
</template>

<script>
    export default {
      name: "dashboard",
      users: [],
      data(){
        return {
          loading: false,
        }
      },
      methods: {
        async checkStore() {
          try {
            await this.$store.dispatch('authCheck')
            await this.$store.dispatch('userLoggedIn')
          }
          catch(err) {
            console.log(err.message);
          }
          finally {
            this.loading = false
          }
          
        }
      },
      async mounted() {
        this.loading = true
        await this.checkStore()
      }
    }
</script>


<style>

</style>