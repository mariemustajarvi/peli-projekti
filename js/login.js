import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

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

const loginBtn = document.getElementById('loginBtn');
const googleLoginBtn = document.getElementById('googleBtn');

let writeUserData = (userId, name) => {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    username: name,
    scores: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    completedMissions: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    }
  }).then(() => {
    window.location.href = 'index.html';
  })
}

loginBtn.addEventListener('click', event => {
  event.preventDefault()
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const errorMsg = document.getElementById('errorMessage');

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        errorMsg.innerHTML = 'Virheellinen sähköpostiosoite'
      } else if (errorCode == 'auth/invalid-credential') {
        errorMsg.innerHTML = 'Sähköposti ja salasana eivät täsmää'
      }
    });
});

googleLoginBtn.addEventListener('click', (event) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    const userId = result.user.uid;
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        window.location.href = "index.html";
      } else {
        writeUserData(userId, result.user.displayName);
      }
    });
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
});

// korkean kontrastin asetukset
const contrastToggle = document.getElementById('contrastToggle');
if (contrastToggle) {
  contrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    contrastToggle.setAttribute(
      'aria-label',
      isHighContrast ? 'Vaihda normaaliin tilaan' : 'Vaihda korkean kontrastin tilaan'
    );
  });
}