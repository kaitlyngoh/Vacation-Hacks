<template>
    <button id = "btn" @click="signOut()" v-if="user"> LOGOUT </button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
    name: 'Logout',
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
    },
    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth,user)
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style scoped>
#btn{
    background-color: #f3f6f8; 
    border-radius: 10px; 
    /* border: 2px solid black;  */
    padding: 10px 50px; 
    color: black;
    text-align: center;
}

#btn:hover {
    color: antiquewhite;
    background-color: red;
    box-shadow: 3px 3px grey;
}
</style>