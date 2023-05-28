<template>
  <div id="loading" style="display: none;">Please allow response time of up to a minute...</div>
  <div id="secondContainer">
    <form id="myForm">
      <h1 class="titleOfDiv">Vacation Planner</h1>
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
          placeholder="Enter Budget (USD)"
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
          <button id="saveBtn" type="button" v-on:click="accessGpt">Save</button>
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

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { Spinner } from 'spin.js';


const apiKey = import.meta.env.VITE_APP_API_KEY;

const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      user: false,
      useremail: '',
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
      }
    });
  },

  methods: {
    async accessGpt() {
      var opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 1.2, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-shrink', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'absolute', // Element positioning
      };
      var target = document.getElementById('loading');
      var spinner = new Spinner(opts).spin(target);

      document.getElementById("loading").style.display = "block";
      spinner.spin(document.body);
      let location = document.getElementById('location1').value;
      let days = document.getElementById('days1').value;
      let budget = document.getElementById('budget1').value;
      let month = document.getElementById('month1').value;

      let message =
        'Create an itinerary for a ' +
        days +
        'days trip to ' +
        location +
        'with a budget of ' +
        budget;
      alert('FINDING ITINERARY FOR: ' + location);

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
          document.getElementById("loading").style.display = "none";
          spinner.stop();
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
