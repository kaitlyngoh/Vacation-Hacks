<template>
    <div id = logged v-if="user">
        <div id ="nav">
            <div id="pages">
                <img src="@/assets/travel.png" style="height: 12vh; width: 6vw; margin-right: 20px;">
                    <router-link to = "/home"> Home</router-link> |
                    <router-link to = "/about"> About</router-link> |
                    <router-link to = "/profile"> Profile</router-link>
            </div>
        </div>
    </div>
    </template>
    
    <style>
    #nav {
        background-color: rgb(177, 229, 255);
    }
    
    /* #nav a {
        font-weight: bold;
        color: rgb(87, 80, 69);
    }
    
    #nav a.router-link-exact-active {
        color: yellowgreen;
    } */
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