import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
    window.location.href = 'index.html';
  }
});

let writeUserData = (userId, name) => {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId)

  set(reference, {
    username: name
  }).then(() => {
    window.location.href = 'index.html';
  })
}

const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', event => {
  event.preventDefault()
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('errorMessage');

  if (password.length < 6) {
    errorMsg.innerHTML = 'Virhe: Salasanan on oltava vähintään 6 merkkiä pitkä';
  } else if (username.length > 20) {
    errorMsg.innerHTML = 'Virhe: Agenttinimi voi olla enintään 20 merkkiä pitkä';
  } else if (password != confirmPassword) {
    errorMsg.innerHTML = 'Virhe: Salasanat eivät täsmää';
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId);
        console.log(username);
        writeUserData(userId, username)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          errorMsg.innerHTML = 'Virhe: Sähköpostiosoite on jo käytössä';
        }
      });
  }
});