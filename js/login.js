import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
const database = getDatabase(app);

export { auth, database };

const loginBtn = document.getElementById('loginBtn');

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

/*

// Kirjautumislomakkeen lähetys
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Luo feikki käyttäjänimi sähköpostista testausta varten
    const username = email.split('@')[0];
    
    // Tarkista onko kyseessä eri käyttäjä
    const oldUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isDifferentUser = oldUser.email && oldUser.email !== email;
    
    // Tyhjennä edistyminen, jos vaihdetaan käyttäjää
    if (isDifferentUser) {
      localStorage.removeItem('user_points');
      localStorage.removeItem('completedLevels');
      localStorage.removeItem('achievements');
    }
    
    // Tallenna feikki käyttäjätiedot localStorageen tastausta varten
    const userData = {
      username: username,
      email: email,
      loggedIn: true,
      loginAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    console.log('Login successful:', { email });
    
    // Siirry etusivulle
    alert('Tervetuloa takaisin, agentti ' + username + '!');
    window.location.href = 'index.html';
  });
}

// Google login buttoni
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    console.log('Google login clicked');
    alert('Google-kirjautuminen tulossa pian! (Demo)');
  });
}

// Facebook login buttoni
const facebookBtn = document.getElementById('facebookBtn');
if (facebookBtn) {
  facebookBtn.addEventListener('click', () => {
    console.log('Facebook login clicked');
    alert('Facebook-kirjautuminen tulossa pian! (Demo)');
  });
}
*/