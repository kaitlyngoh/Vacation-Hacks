<template>
<div>
    <NavBar/>
    <h3>This is Profit Page</h3>
    <ProfitDisplay/>
    <Logout/>
</div>

</template>

<script>
import ProfitDisplay from "@/components/ProfitDisplay.vue"
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
    name : 'OnlyProfit',
    components : {
        ProfitDisplay,
        NavBar,
        Logout
    },
    data() {
        return {
            user: false,
            useremail: ''
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
