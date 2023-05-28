import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyApMdzYeZAetpQo71SqHRzoW-i-QfPpEh0",
    authDomain: "democpp-6a8f0.firebaseapp.com",
    projectId: "democpp-6a8f0",
    storageBucket: "democpp-6a8f0.appspot.com",
    messagingSenderId: "777657228591",
    appId: "1:777657228591:web:49579722717dc5d71a95da",
    measurementId: "G-Q2HZBY414V"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
