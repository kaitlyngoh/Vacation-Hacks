<template>
        <h2 id = "IP">Weather</h2>
        <br>
        <h3 v-if="this.temp">{{ this.temp }}</h3>
        <h3 v-else> Please Key In Month</h3>
        <br>
</template>

<script>
import fireBaseApp from "../firebase.js"
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where, updateDoc, doc} from 'firebase/firestore';

const db = getFirestore(fireBaseApp);

export default {
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.useremail = user.email;
        }});
    },
    created() {
        const tempPromise = this.updateTemp();
    },
    data() {
        return {
            temp: ''
        }
    },
    methods: {
        async updateTemp() {
            return new Promise(async (resolve, reject) => {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
            if (user) {
                const weatherCollection = collection(getFirestore(), "weather");
                const tempQuery = query(
                    weatherCollection,
                    where("email", "==", user.email),
                );
                const querySnapshotWeather = await getDocs(tempQuery);
                const userDocument = (querySnapshotWeather.docs)[0]
                var temp = userDocument.data().temperature
                this.temp = temp
                resolve(temp);
            } else {
                reject("User not authenticated.");
            }
            }
            )
        })
        }
    }
}
</script>

<style scoped>

h2 {
    text-align: center;
    background-color: rgb(30, 165, 116);
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