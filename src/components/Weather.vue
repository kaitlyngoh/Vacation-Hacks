<template>
    <br>
    <div id="weathericons">
        <img src="@/assets/sun.png" style="height: 4vh; width: 2vw; margin-right: 15px;">
        <h2 id = "IP">Weather</h2>
        <img src="@/assets/rain.png" style="height: 4vh; width: 2vw; margin-left: 15px;">
    </div>
    <h3 v-if="this.temp" style="font-size: 25px;">{{ this.temp }} in {{ this.mth }}</h3>
    <h3 v-else style="font-size: 25px;"> Please Key In Fields</h3>
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
            temp: '',
            mth: ''
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
                var mth = userDocument.data().month
                this.temp = temp
                this.mth = mth
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

#weathericons {
  background-color: rgb(0, 13, 80);
  color: white;
  display: inline-block;
  border-radius: 25px;
  width: 90vw;
}

#weathericons img,
#weathericons h2 {
  display: inline-block;
  vertical-align: middle;
}

</style>