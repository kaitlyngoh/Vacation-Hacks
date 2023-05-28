<template>
        <h2 id = "IP">Itenary Plan</h2>
        <br>
        <h3 v-if="this.itr">{{ this.itr }}</h3>
        <h3 v-else> Please Key In Itenary</h3>
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
        const tempPromise = this.updateItr();
    },
    data() {
        return {
            itr: ''
        }
    },
    methods: {
        async updateItr() {
            return new Promise(async (resolve, reject) => {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
            if (user) {
                const itrCollection = collection(getFirestore(), "itinerary");
                const itrQuery = query(
                    itrCollection,
                    where("email", "==", user.email),
                );
                const querySnapshotItr = await getDocs(itrQuery);
                const userDocument = (querySnapshotItr.docs)[0]
                var itr = userDocument.data().plan
                this.itr = itr
                console.log(itr)
                resolve(itr);
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