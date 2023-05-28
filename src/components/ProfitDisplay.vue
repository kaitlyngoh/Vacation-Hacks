<template>
        <h2 id = "IP">Itenary Plan</h2>
</template>

<script>
import fireBaseApp from "../firebase.js"
import { getFirestore } from "firebase/firestore"

const db = getFirestore(fireBaseApp);

export default {
    data() {
        return {
         
        }
    },
}
</script>

<style>

h1,h2 {
    text-align: center;
    background-color: rgb(146, 76, 226);
    font: 700;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.bwt {
    color: aquamarine;
    background-color: red;
}
</style>