<template>
    <div id="secondContainer">  
        <form id="myForm">
            <h1 class = "titleOfDiv" >Add Coins</h1><br>
            <div class="formLi">
                <label for="coin1"> Coin Name: </label>
                <input type="text" id = "coin1" required= "" placeholder="Enter Coin"> <br><br>

                <label for="ticker1"> Ticker: </label>
                <input type="text" id = "ticker1" required= "" placeholder="Valid Token"> <br><br>

                <label for="buy1"> Buy Price: </label>
                <input type="text" id = "buy1" required= "" placeholder="Buy Price"> <br><br>

                <label for="quant1"> Buy Quantity: </label>
                <input type="text" id = "quant1" required= "" placeholder="Quantity"> <br><br>

                <div class="save">
                    <button id="saveBtn" type="button" v-on:click="saveToFs">Save</button><br><br>
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
            console.log("IN ADD COIN")
            let coin = document.getElementById("coin1").value
            let ticker = document.getElementById("ticker1").value
            let buyPrice = document.getElementById("buy1").value
            let amt = document.getElementById("quant1").value
            alert("SAVING DATA FOR COIN: " + coin)
            try {
                const docRef = await setDoc(doc(db, String(this.useremail),coin), {
                Coin: coin,
                Ticker:ticker,
                Buy:buyPrice,
                Quantity:amt
                })
                console.log("SAVED TO FIRESTORE DATABASE FOR COIN: " + coin)
                document.getElementById('myForm').reset();
                this.$emit("added")
            } catch (error) {
                console.error("Error adding document: ", error)
            }
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

