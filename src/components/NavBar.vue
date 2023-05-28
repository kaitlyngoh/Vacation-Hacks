<template>
<div id = logged v-if="user">
    <div id ="nav">
        <router-link to = "/home"> Home</router-link> |
        <router-link to = "/about"> About</router-link> |
        <router-link to = "/profile"> Profile</router-link> 
    </div>
</div>
</template>

<style>
#nav {
    padding: 30px;
    text-align: center;
}

#nav a {
    font-weight: bold;
    color: rgb(87, 80, 69);
}

#nav a.router-link-exact-active {
    color: yellowgreen;
}
</style>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
    name: 'NavBar',
    data() {
        return {
            user:false
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>