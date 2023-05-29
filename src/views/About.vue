<template>
<div style="text-align: center" v-if="user">
  <NavBar/>
  <h2>Welcome to Vacation Hack</h2>
  <h3>Vacation Hacks aims to help users plan their travel itineraries efficiently. <br>
    It provides a user-friendly interface where users can input their travel preferences, such as destination, duration of stay and budget. <br>
    The system then generates a personalized travel itinerary as well as weather information based on the provided information.</h3>
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