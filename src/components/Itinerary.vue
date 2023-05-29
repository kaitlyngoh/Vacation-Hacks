<template>
        <h2 id = "IP">Itinerary Plan</h2>

        <h3 v-if="this.loc">{{ this.drn }} days itinerary in {{ this.loc }} (USD ${{ this.bgt }}) </h3>
        
        <table>
            <tr v-for="item in items" :key="item">
                <td>{{ item }}</td>
            </tr>
        </table>


        <h3 v-if="this.itr"></h3>
        <h3 v-else> Please Key In Itinerary</h3>
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
            itr: '',
            loc: '',
            drn: '',
            items:''
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
                var loc = userDocument.data().location
                var drn = userDocument.data().days
                var bgt = userDocument.data().budget
                this.bgt = bgt
                this.drn = drn
                this.loc = loc
                this.itr = itr
                
                let days = itr.split('\n\n');
                this.items = days 
                console.log(days)

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
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid rgb(25, 9, 21);
}

tr:nth-child(even) {
    background-color: #c11313;
}

tr:nth-child(odd) {
    background-color: #15a43b;
}

th {
    background-color: #4CAF50;
    color: white;
}

</style>