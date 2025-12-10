import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
const db = getDatabase();
const auth = getAuth(app);

/*const userId = auth.currentUser.uid;
onValue(ref(db, 'users/' + userId), (snapshot) => {
    const username = (snapshot.val() && snapshot.val().username);
    console.log(username);
}, {
    onlyOnce: true
});*/

const loginBtn = document.getElementById('loginBtn')
const loginBtnText = document.getElementById('loginBtnText')

let userLoggedIn = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        userLoggedIn = true;
        loginBtnText.innerHTML = 'Kirjaudu ulos';
        const userId = user.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val().username);
            }
        });
    } else {
        userLoggedIn = false;
    }
});

loginBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (userLoggedIn) {
        signOut(auth).then(() => {
            loginBtnText.innerHTML = "Kirjaudu sisään / rekisteröidy"
        })
    } else {
        window.location.href = loginBtn.href;
    }
});