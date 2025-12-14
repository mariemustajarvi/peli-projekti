import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

const firebaseConfig = {

    apiKey: "AIzaSyCUZNqdanUH2Z63t5GWw1JjY-0ffwqCy7I",

    authDomain: "tuotekehitysprojekti-5f330.firebaseapp.com",

    projectId: "tuotekehitysprojekti-5f330",

    storageBucket: "tuotekehitysprojekti-5f330.firebasestorage.app",

    messagingSenderId: "362924183192",

    appId: "1:362924183192:web:337b854b2ecc8b53e48aed",

    databaseURL: "https://tuotekehitysprojekti-5f330-default-rtdb.europe-west1.firebasedatabase.app"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'mainframe.html';
    }
});