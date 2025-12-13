import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, update } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
        oldScore = data.scores[3];
        const updates = {};
        if (points > oldScore) {
          updates['/scores/3/'] = points;
        }
        updates['completedMissions/3/'] = true;
        update(userRef, updates)
      }
    });
  }
};

const sites = [
  {
    url: "https://www.amazon.com",
    isSafe: true,
    rightExplanation:
      "Tämä verkkosivusto on turvallinen! ✅\n" +
      "Tämä näyttää oikealta Amazon-verkkokaupalta.",
    wrongExplanation:
      "Tämä verkkosivusto on oikeasti turvallinen.",
    indicators: [
      "⚠️ HTTPS-yhteys (lukko-ikoni)",
      "❌ Aito verkkotunnus amazon.com",
      "❌ Tunnettu ja luotettava palvelu"
    ],
    tips: [
      "• Etsi HTTPS ja lukko-ikoni selaimesta",
      "• Tarkista verkkotunnuksen oikeinkirjoitus",
      "• Suuret palvelut käyttävät omia, selkeitä domaineja"
    ]
  },
  {
    url: "http://amaz0n-deals.biz/login",
    isSafe: false,
    rightExplanation: "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation: "Tämä sivu on itse asiassa vaarallinen huijaussivu.",
    indicators: [
      "⚠️ HTTP (ei turvallinen)",
      "❌ Väärin kirjoitettu verkkotunnus (amaz0n)",
      "❌ Epäilyttävä .biz-pääte",
      "❌ Pyytää kirjautumista"
    ],
    tips: [
      "• Ei HTTPS tarkoittaa, että tietoja ei salata",
      "• Verkkotunnus käyttää nollaa 'o':n sijaan",
      "• Älä koskaan syötä salasanoja HTTP-sivustoilla",
      "• Älä seuraa tukilinkkejä sähköpostista – kirjoita osoite itse"
    ]
  },
  {
    url: "https://www.wikipedia.org",
    isSafe: true,
    rightExplanation: "Tämä verkkosivusto on turvallinen!",
    wrongExplanation: "Tämä sivu on turvallinen.",
    indicators: [
      "🔒 HTTPS-yhteys",
      "✅ Tunnettu verkkotunnus",
      "✅ Turvallinen yhteys"
    ],
    tips: [
      "• Wikipedia on luotettava opetusresurssi",
      "• HTTPS suojaa yhteytesi",
      "• Aito .org-verkkotunnus"
    ]
  },
  {
    url: "http://free-iphones-now.ru/claim",
    isSafe: false,
    rightExplanation: "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation: "Tämä verkkosivusto on epäturvallinen!",
    indicators: [
      "⚠️ HTTP (ei turvallinen)",
      "❌ Liian hyvältä kuulostaakseen totta -tarjous",
      "❌ Epäilyttävä .ru-verkkotunnus",
      "❌ 'Free' URL:ssa"
    ],
    tips: [
      "• Vältä sivustoja, jotka lupaavat ilmaisia kalliita tuotteita",
      "• Ole varovainen ulkomaisten verkkotunnusten kanssa",
      "• Mikään aito yritys ei anna ilmaisia iPhoneja",
      "• HTTP tarkoittaa, että tietosi ovat alttiina"
    ]
  },
  {
    url: "https://bank0famerica.com/login",
    isSafe: false,
    rightExplanation: "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation: "Tämä verkkosivusto on epäturvallinen!",
    indicators: [
      "🔒 On HTTPS mutta...",
      "❌ Käyttää nollaa 'o':n sijaan",
      "❌ Väärennös pankkisivusto",
      "⚠️ Tietojenkalasteluyritys"
    ],
    tips: [
      "• Pelkkä HTTPS ei tarkoita turvallista!",
      "• Tarkista aina verkkotunnuksen oikeinkirjoitus huolellisesti",
      "• Tallenna pankkisi oikea verkkosivusto kirjanmerkkeihin",
      "• Kirjoita pankkien URL:t manuaalisesti, älä klikkaa linkkejä"
    ]
  },
  {
    url: "https://www.youtube.com",
    isSafe: true,
    rightExplanation: "Tämä verkkosivusto on turvallinen!",
    wrongExplanation: "Tämä sivu on turvallinen.",
    indicators: [
      "🔒 HTTPS-yhteys",
      "✅ Aito Google-palvelu",
      "✅ Oikea kirjoitusasu"
    ],
    tips: [
      "• YouTube on luotettava alusta",
      "• Vahvista aina, että olet oikealla sivustolla",
      "• Etsi lukkokuvake"
    ]
  }
];


const MAX_POINTS = 200;
const pointsPerCorrect = Math.floor(MAX_POINTS / sites.length); 
const computedMax = sites.length * pointsPerCorrect;           
let currentIndex = 0;
let correctCount = 0;
let points = 0;


const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const pointsEl = document.getElementById("points");
const maxPointsEl = document.getElementById("maxPoints");

const siteUrlEl = document.getElementById("siteUrl");

const btnSafe = document.getElementById("btnSafe");
const btnUnsafe = document.getElementById("btnUnsafe");

const feedbackSection = document.getElementById("feedbackSection");
const feedbackBox = document.getElementById("feedbackBox");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const indicatorList = document.getElementById("indicatorList");
const tipList = document.getElementById("tipList");
const nextBtn = document.getElementById("nextBtn");

const quizPanel = document.getElementById("quizPanel");
const resultScreen = document.getElementById("resultScreen");
const resultScoreText = document.getElementById("resultScoreText");
const resultComment = document.getElementById("resultComment");
const resultPointsText = document.getElementById("resultPointsText");
const resultEmoji = document.getElementById("resultEmoji");
const retryBtn = document.getElementById("retryBtn");

qTotalEl.textContent = sites.length.toString();
maxPointsEl.textContent = MAX_POINTS.toString();
pointsEl.textContent = "0";


function showSite(index) {
  const site = sites[index];
  siteUrlEl.textContent = site.url;
  qIndexEl.textContent = (index + 1).toString();

  btnSafe.disabled = false;
  btnUnsafe.disabled = false;

  feedbackSection.classList.add("hidden");
  feedbackBox.classList.remove("correct", "wrong");
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";

  indicatorList.innerHTML = "";
  tipList.innerHTML = "";

  btnSafe.focus();
}

function handleAnswer(isSafeAnswer) {
  if (btnSafe.disabled && btnUnsafe.disabled) return;

  const site = sites[currentIndex];
  const correct = isSafeAnswer === site.isSafe;

  btnSafe.disabled = true;
  btnUnsafe.disabled = true;

  feedbackBox.classList.remove("correct", "wrong");

  if (correct) {
    correctCount++;


    points += pointsPerCorrect;

    if (currentIndex === sites.length - 1 && correctCount === sites.length) {
      points = MAX_POINTS;
    }

    pointsEl.textContent = points.toString();

    feedbackBox.classList.add("correct");
    feedbackTitle.textContent = "✅ Oikein!";
    feedbackText.innerHTML = site.rightExplanation.replace(/\n/g, "<br>");
  } else {
    feedbackBox.classList.add("wrong");
    feedbackTitle.textContent = "❌ Ei aivan!";
    feedbackText.innerHTML = site.wrongExplanation.replace(/\n/g, "<br>");
  }

  site.indicators.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    indicatorList.appendChild(li);
  });

  site.tips.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    tipList.appendChild(li);
  });

  feedbackSection.classList.remove("hidden");

  if (currentIndex >= sites.length - 1) {
    nextBtn.textContent = "Näytä tulos";
  } else {
    nextBtn.textContent = "Seuraava sivusto →";
  }

  nextBtn.focus();
}

function nextSite() {
  if (currentIndex >= sites.length - 1) {
    finishGame();
    return;
  }
  currentIndex++;
  showSite(currentIndex);
}

function finishGame() {
  quizPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScoreText.textContent = `${correctCount} / ${sites.length} oikein`;

  const ratio = correctCount / sites.length;
  let comment;
  let emoji = "👏";

  if (ratio === 1) {
    comment = "Täydellinen suoritus, agentti!";
    emoji = "🏅";
  } else if (ratio >= 0.7) {
    comment = "Hyvä työ, agentti!";
    emoji = "👍";
  } else {
    comment = "Jatka harjoittelua, agentti!";
    emoji = "🧠";
  }

  savePoints(points);

  resultComment.textContent = comment;
  resultEmoji.textContent = emoji;
  resultPointsText.textContent = `+${points} pistettä`;

  retryBtn.focus();
}

function restartGame() {
  currentIndex = 0;
  correctCount = 0;
  points = 0;
  pointsEl.textContent = "0";

  resultScreen.classList.add("hidden");
  quizPanel.classList.remove("hidden");

  nextBtn.textContent = "Seuraava sivusto →";
  showSite(currentIndex);
}


btnSafe.addEventListener("click", () => handleAnswer(true));
btnUnsafe.addEventListener("click", () => handleAnswer(false));
nextBtn.addEventListener("click", nextSite);
retryBtn.addEventListener("click", restartGame);


document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lower = key.toLowerCase();

  const quizVisible = !quizPanel.classList.contains("hidden");
  const resultVisible = !resultScreen.classList.contains("hidden");
  const feedbackVisible = !feedbackSection.classList.contains("hidden");

  const handledKeys = [
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "Enter",
    " ",
    "t",
    "e",
    "n",
    "r",
    "b"
  ];

  if (handledKeys.includes(key) || handledKeys.includes(lower)) {
    event.preventDefault();
  }

  if (key === "Escape" || lower === "b") {
    window.location.href = "index.html";
    return;
  }

  if (quizVisible) {
    if (!feedbackVisible) {
      if (lower === "t" || key === "ArrowLeft") {
        handleAnswer(true);
        return;
      }
      if (lower === "e" || key === "ArrowRight") {
        handleAnswer(false);
        return;
      }
      return;
    }

    if (key === "Enter" || key === " " || lower === "n") {
      nextSite();
      return;
    }
    return;
  }

  if (resultVisible) {
    if (lower === "r" || key === "Enter") {
      restartGame();
      return;
    }
  }
});


function initHighContrastToggle() {
  const contrastToggle = document.getElementById("contrastToggle");
  if (!contrastToggle) return;

  const body = document.body;

  body.classList.remove("high-contrast");
  localStorage.removeItem("high_contrast_mode");

  contrastToggle.addEventListener("click", function () {
    body.classList.toggle("high-contrast");
    const isHighContrast = body.classList.contains("high-contrast");

    if (isHighContrast) {
      contrastToggle.setAttribute("aria-label", "Vaihda takaisin normaaliin tilaan");
      contrastToggle.setAttribute("title", "Vaihda takaisin normaaliin tilaan");
    } else {
      contrastToggle.setAttribute("aria-label", "Vaihda korkean kontrastin tilaan");
      contrastToggle.setAttribute("title", "Vaihda korkean kontrastin tilaan");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHighContrastToggle);
} else {
  initHighContrastToggle();
}


showSite(currentIndex);
