<template>
<div style="text-align: center" v-if="user">
  <NavBar/>
  <h3>This is an About Page</h3>
  <h2>Welcome to CPP</h2>
  <h3>CPP Description: Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Suscipit eum
    natus illo ipsam eveniet in ullam, quisquam
    recusandae tenetur voluptates earum iusto non
    nulla porro? Perferendis quos dignissimos
    recusandae veritatis? </h3>
    <Logout/>
</div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name:"About",
  
  components: {
  NavBar,
  Logout
  },

  data() {
    return {
      user:false,
      useremail: ""
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
        }
    })
  }
}

</script>