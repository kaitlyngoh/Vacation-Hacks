<template>
    <div id="secondContainer">  
        <form id="myForm">
            <h1 class = "titleOfDiv" >Vacation Planner</h1><br>
            <div class="formLi">
                <label for="location1"> Location: </label>
                <input type="text" id = "location1" required= "" placeholder="Enter Location"> <br><br>

                <label for="days1"> No. of Days: </label>
                <input type="text" id = "days1" required= "" placeholder="Enter Days"> <br><br>

                <label for="budget1"> Budget: </label>
                <input type="text" id = "budget1" required= "" placeholder="Enter Budget"> <br><br>

                <div class="save">
                    <button id="saveBtn" type="button" v-on:click="accessGPt">Save</button><br><br>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp);
export default {
    data() {
        return { 
            user: false,
            useremail: '' 
        } 
    },

    mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=> {
            if (user) {
                this.user = user
                this.useremail = user.email;
            }
        })
    },

    methods: {
        async saveToFs() {
        }
    }
}
</script>

<style scoped>
h1 {
    background-color: rgb(221, 148, 143);
}

.formLi {
    display: inline-block;
    text-align: right;
}
form {
    text-align: center;
    align-items: center;
    margin: auto;
}
input:hover {
    box-shadow: 3px 3px rgb(224, 248, 8);
    border-radius: 2px;
}
.save {
    text-align: center;
}

</style>

