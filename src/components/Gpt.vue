<template>
  <loading v-model:active="isLoading"></loading>
  <div id="loading" style="display: none;">Please allow response time of up to a minute...</div>
  <div id="secondContainer">
    <form id="myForm">
      <h1 class="titleOfDiv">Please Enter Your Trip Details</h1>
      <br />
      <div class="formLi">
        <label for="location1"> Location: </label>
        <input
          type="text"
          id="location1"
          required=""
          placeholder="Enter Location"
        />
        <br /><br />

        <label for="days1"> No. of Days: </label>
        <input type="text" id="days1" required="" placeholder="Enter Days" />
        <br /><br />

        <label for="budget1"> Budget: </label>
        <input
        
          type="text"
          id="budget1"
          required=""
          placeholder="Enter Budget"
        />
        <br /><br />

        <label for="month1"> Month: </label>
        <input
          type="text"
          id="month1"
          required=""
          placeholder="Enter Month"
        />
        <br /><br />

        <div class="save">
          <button id="saveBtn" type="button" v-on:click="accessGpt">Let's Go !</button>
          <br /><br />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, getDocs, query, where, deleteDoc} from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Loading from 'vue-loading-overlay';

import Swal from 'sweetalert2';


const apiKey = import.meta.env.VITE_APP_API_KEY;

const db = getFirestore(firebaseApp);
export default {

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
      }
    });
  },

  components: {
    Loading
  },
  
  data() {
    return {
      user: false,
      useremail: '',
      isLoading: false

    };
  },


  methods: {
    async accessGpt() {
      // Delete All Existing Files owned by user

      // Query User documents and delete all
      if (this.useremail) {
        const itrCollection = collection(getFirestore(), "itinerary");
        const itrQuery = query(
          itrCollection,
          where("email", "==", this.useremail),);
          const queryItrSnapshot = await getDocs(itrQuery);
          queryItrSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });

        const weatherCollection = collection(getFirestore(), "weather");
        const weatherQuery = query(
          weatherCollection,
          where("email", "==", this.useremail),);
        const weatherSnapshot = await getDocs(weatherQuery);
        weatherSnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      }

      this.isLoading = true;
      document.getElementById("loading").style.display = "block";
      let location = document.getElementById('location1').value;
      let days = document.getElementById('days1').value;
      let budget = document.getElementById('budget1').value;
      let month = document.getElementById('month1').value;

      let message =
        'Create an itinerary for a ' +
        days +
        'days trip to ' +
        location +
        '($ ' +
        budget + 
        ")";

      Swal.fire(
        'Itinerary for a ' +
        days +
        ' days trip to ' +
        location 
        );

      let request = {
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000,
          temperature: 0.7,
        },
      };


      axios(request)
        .then(async (response) => {
          this.isLoading = false;
          document.getElementById("loading").style.display = "none";
          const responseData = response.data.choices[0].message.content;
          // Response from gpt about Itinerary
          console.log(responseData);

          try {
            this.$emit('save');
            const docRef = await setDoc(doc(db, 'itinerary', location + this.useremail), {
              email:this.useremail,
              location: location,
              days: days,
              budget: budget,
              plan: responseData,
            });
            console.log(
              'SAVED TO FIRESTORE DATABASE FOR LOCATION: ' + location
            );
          } catch (error) {
            console.error('Error adding document: ', error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    message = 'Give me 1 number for the temperature in ' + location + 'in the month of ' + month
    request = {
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000,
          temperature: 1,
        },
      };
      axios(request)
        .then(async (response) => {
          const responseData = response.data.choices[0].message.content;
          // Response from gpt about weather
          console.log(responseData);

          try {
            this.$emit('save');
            const docRef = await setDoc(doc(db, 'weather',  location + this.useremail), {
              email: this.useremail,
              temperature: responseData,
              month: month
            });
            console.log(
              'SAVED TO FIRESTORE DATABASE FOR TEMPERATURE OF LOCATION: ' + location
            );
          } catch (error) {
            console.error('Error adding document: ', error);
          }
        })
        .catch((error) => {
          console.error(error);
        });


    },
  },
};
</script>

<style scoped>
h1 {
  background-color: rgb(0, 13, 80);
  color: white;
  display: inline-block;
  padding: 17px;
  border-radius: 25px;
  width: 90vw;
}

input {
  height: 35px;
  border-radius: 10px;
  outline: none;
  margin-left: 25px;
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
  box-shadow: 3px 3px rgb(0, 0, 0);
}
.save {
  display: flex;
  justify-content: center;
}

input[type="text"] {
    text-align: center;
}

#saveBtn {
  background-color: #f3f6f8; 
  border-radius: 10px; 
  /* border: 2px solid black;  */
  padding: 10px 50px; 
  color: black;
  text-align: center;
}
</style>
