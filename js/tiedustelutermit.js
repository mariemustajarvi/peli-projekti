import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, update, onValue } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
let userRef = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    userRef = ref(db, 'users/' + userId);
  } else {
    window.location.href = "index.html";
  }
});

const savePoints = (points) => {
  if (userRef) {
    let oldScore = 0;
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        oldScore = data.scores[6];
        const updates = {};
        if (points > oldScore) {
          updates['/scores/6/'] = points;
        }
        updates['completedMissions/6/'] = true;
        update(userRef, updates)
      }
    });
  }
};

(function() {
  const data = [
    { id: 'malware', term: "Haittaohjelma", def: "Haitallinen ohjelmisto joka on suunniteltu vahingoittamaan laitetta" },
    { id: 'firewall', term: "Palomuuri", def: "Turvajärjestelmä joka valvoo verkkoliikennettä" },
    { id: 'encryption', term: "Salaus", def: "Tietojen muuttaminen salaiseksi koodiksi" },
    { id: 'phishing', term: "Tietojenkalastelu", def: "Väärennettyjä viestejä jotka yrittävät varastaa tietoja" },
    { id: '2fa', term: "2FA", def: "Ylimääräinen turvatoimenpide käyttäen kahta vahvistusta" },
    { id: 'vpn', term: "VPN", def: "Piilottaa IP-osoitteesi ja salaa yhteyden" },
    { id: 'antivirus', term: "Virustorjunta", def: "Ohjelmisto joka tunnistaa ja poistaa haitalliset ohjelmat" },
    { id: 'cookie', term: "Eväste", def: "Pieni tiedosto joka seuraa selausaktiviteettiasi" }
  ];

  let selectedTerm = null;
  let matches = 0;

  const termsList = document.getElementById('termsList');
  const defsList = document.getElementById('defsList');
  const matchesEl = document.getElementById('matches');
  const panel = document.querySelector('.panel');
  const resultScreen = document.getElementById('resultScreen');

  function init() {
    const sortedData = [...data];
    const shuffledData = [...data].sort(() => Math.random() - 0.5);

    sortedData.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'game-btn';
      btn.textContent = item.term;
      btn.dataset.id = item.id;
      btn.dataset.type = 'term';
      btn.addEventListener('click', handleClick);
      termsList.appendChild(btn);
    });

    shuffledData.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'game-btn';
      btn.textContent = item.def;
      btn.dataset.id = item.id;
      btn.dataset.type = 'def';
      btn.addEventListener('click', handleClick);
      defsList.appendChild(btn);
    });
  }

  function handleClick(e) {
    const clickedBtn = e.target;
    if (clickedBtn.classList.contains('correct')) return;

    if (clickedBtn.dataset.type === 'term') {
      if (selectedTerm) selectedTerm.classList.remove('selected');
      selectedTerm = clickedBtn;
      selectedTerm.classList.add('selected');
    } 
    else if (clickedBtn.dataset.type === 'def' && selectedTerm) {
      if (clickedBtn.dataset.id === selectedTerm.dataset.id) {
        handleMatch(selectedTerm, clickedBtn);
      } else {
        handleMismatch(clickedBtn);
      }
    }
  }

  function handleMatch(termBtn, defBtn) {
    termBtn.classList.remove('selected');
    termBtn.classList.add('correct');
    defBtn.classList.add('correct');
    matches++;
    matchesEl.textContent = `${matches}/8`;
    selectedTerm = null;

    if (matches === 8) showCompletion();
  }

  function handleMismatch(defBtn) {
    defBtn.classList.add('wrong');
    setTimeout(() => defBtn.classList.remove('wrong'), 400);
  }

  function showCompletion() {
    savePoints(200);
    setTimeout(() => {
      panel.classList.add('hidden');
      resultScreen.classList.remove('hidden');
      try {
        let pts = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', pts + 200);
      } catch(e) {}
    }, 500);
  }

  init();
})();