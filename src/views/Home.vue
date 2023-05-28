<template>
<NavBar/>
  <!-- <div>
    <img src="src/assets/HappyPlatesLogo.png" style="width: 200px; height: 200px; object-fit: cover"/>
  </div> -->
<AddCoin @added = "change"/>
<ProfitDisplay :key = "refreshComp"/>
<Logout/>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import WelcomeCpp from "@/components/WelcomeCpp.vue"
import AddCoin from "@/components/AddCoin.vue"
import ProfitDisplay from '@/components/ProfitDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'

export default {
  name: 'App',
  components : {
    AddCoin,
    ProfitDisplay,
    NavBar,
    Logout
  },
  data() {
    return {
      refreshComp:0,
      user:false
    }
  },
  methods: {
    change() {
      this.refreshComp +=1
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        this.useremail = user.email
      }
    })
    }
}
</script>

<style>

#app {
  font-family: Avenir,Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: rgb(0, 0, 0);
  margin-top: 30px;
}
label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width : 60%;
}
</style>