import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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

let writeUserData = (userId, name, imageUrl) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId)

    set(reference, {
        username: name,
        profile_picture: imageUrl
    })
}

// Tarkistetaan onko käyttäjä jo kirjautunut sisälle, jos ei niin siirrytään kirjautumissivulle.
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        writeUserData(userId, "Niko", "null");
    } else {
        window.location.href = 'login.html'
    }
});