import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
//import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
//import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyCUZNqdanUH2Z63t5GWw1JjY-0ffwqCy7I",

    authDomain: "tuotekehitysprojekti-5f330.firebaseapp.com",

    projectId: "tuotekehitysprojekti-5f330",

    storageBucket: "tuotekehitysprojekti-5f330.firebasestorage.app",

    messagingSenderId: "362924183192",

    appId: "1:362924183192:web:337b854b2ecc8b53e48aed"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Tarkistetaan onko käyttäjä jo kirjautunut sisälle, jos on niin siirrytään etusivulle.
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'index.html'
    }
});

const form = document.getElementById('loginform');

form.addEventListener('submit', event => {
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 6) {
        console.log("Liian lyhyt salasana");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
});