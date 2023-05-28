<template>
    <div style = "text-align:center;" v-if="user"> 
        <NavBar/>
        <h3>PAGE NOT FOUND !!!</h3>
        <h4>PLEASE CLICK ON THE ABOVE AVAILABLE OPTIONS</h4>
        <Logout/>
        <br>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'NotFound',

  components: {
    NavBar,
    Logout
  },

  data() {
    return {
      user: false
    }
  },

  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  },
}
</script>
