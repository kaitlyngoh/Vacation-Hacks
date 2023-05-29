<template>
    <div id = logged v-if="user">
        <div id ="nav">
            <div id="top">
                <img src="@/assets/travel.png" style="height: 12vh; width: 6vw; margin-right: 20px; margin-top: 10px;">
                <span style="font-family: gabriola; font-size: 60px; margin-top: 20px;"> Plan Your Trip With Us !</span> 
            </div>
            <br>
            <div id="pages">
                    <router-link to = "/home"> Home</router-link> |
                    <router-link to = "/about"> About</router-link>
            </div>
        </div>
    </div>
    </template>
    
    <style>
    #top {
        background-color: rgb(152, 221, 255);
        border-radius: 20px;
        height: 120px;
    }

    #top img,
    #top span {
        display: inline-block;
        vertical-align: middle;
    }
    
    #pages {
        font-size: 20px;
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