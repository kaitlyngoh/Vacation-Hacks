<template>
    <div style="text-align:center;" v-if="user">
        <NavBar/>
        <div> <h3><strong> THIS IS PROFILE PAGE </strong></h3></div>
        <div v-if="user">
            <div>
                <img src="src/assets/HappyPlatesLogo.png" style="width: 200px; height: 200px; object-fit: cover"/>
            </div>
            <div>
                <p>Name: <strong> {{ user.displayName }} </strong> <br/>
                Email : <strong> {{ user.email }}</strong> <br/>
                Uid: <strong>{{ user.uid }}</strong> <br/>
                Provider: <strong> {{user.providerData[0].providerId}}</strong></p>
            </div>
        </div>
        <Logout/>
    </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
export default {
    name: 'Profile',
    components: {
        NavBar,
        Logout
    },
    data() {
        return {
            user: false,
        }
    },
    mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user
            }
        })
    }
}
</script>


