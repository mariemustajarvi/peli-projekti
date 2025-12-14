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
        oldScore = data.scores[7];
        const updates = {};
        if (points > oldScore) {
          updates['/scores/7/'] = points;
        }
        updates['completedMissions/7/'] = true;
        update(userRef, updates)
      }
    });
  }
};

const scenarios = [
  {
    text: "Google Chrome päivitys viralliselta asetussivulta",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN \nGoogle Chrome päivittyy sovelluksen omista asetuksista - tämä on oikea reitti",
    wrongMessage: "Tämä on TURVALLINEN \nGoogle Chrome päivittyy sovelluksen omista asetuksista - tämä on oikea reitti",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Selaimesi on vanhentunut - lataa uusi versio tästä .exe-tiedostona",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA \nSelain EI koskaan jaa päivitystä satunnaisella latauslinkillä. Tämä on yleinen malware-ansoitus",
    wrongMessage: "Tämä on UHKA \nSelain EI koskaan jaa päivitystä satunnaisella latauslinkillä. Tämä on yleinen malware-ansoitus",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: " Steam lähettää ilmoituksen: 'Kirjatuminen uudelta laitteelta - oliko tämä sinä?'",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN \nSteamin virallinen turvailmoitus näyttää yleensä tämän kysymyksen",
    wrongMessage: "Tämä on TURVALLINEN \nSteamin virallinen turvailmoitus näyttää yleensä tämän kysymyksen",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Discord Nitro -lahja tuntemattomasta linkistä",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA \nIlmaiset Nitro-linkit ovat lähes aina huijaus, joka varastaa tilin",
    wrongMessage: "Tämä on UHKA \nIlmaiset Nitro-linkit ovat lähes aina huijaus, joka varastaa tilin",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Windows Defender ilmoitus: Troijalainen poistettu onnistuneesti",
    isThreat: false,
    category: "Keskitasoinen uhka",
    rightMessage: "Tämä on TURVALLINEN \nWindows Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa",
    wrongMessage: "Tämä on TURVALLINEN \nWindows Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Nettisivulle ilmestyy ponnahdus: 'Laitteesi on lukittu! Soita Microsoft-tukeen: +41....'",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA\nMicrosoft EI koskaan pyydä soittamaan numeroon. Klassinen tech-support -huijaus",
    wrongMessage: "Tämä on UHKA \nMicrosoft EI koskaan pyydä soittamaan numeroon. Klassinen tech-support -huijaus",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "WhatsAppissa kaveri lähettää viestin: 'Onko tämä sinä videolle?' + epäilyttävä linkki",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA\nTili on näköisesti kaapattu ja linkki vie phishing-sivulle",
    wrongMessage: "Tämä on UHKA\nTili on näköisesti kaapattu ja linkki vie phishing-sivulle",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Sovellus pyytää luvan 'Päästä kaäsiksi koko mediasisältöösi ja kaikkiin tiedostoihin' vaikka se on taskulamppusovellus",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA\nLupa ei vastaa sovelluksen tarkoitusta --> viittaa väärinkäyttöön",
    wrongMessage: "Tämä on UHKA\nLupa ei vastaa sovelluksen tarkoitusta --> viittaa väärinkäyttöön",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Windows Defender ilmoitus: 'Troijalainen poistettu onnistuneesti'",
    isThreat: false,
    category: "Korkea uhka",
    rightMessage: "Tämä on TURVALLINEN\nWindows Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa",
    wrongMessage: "Tämä on TURVALLINEN\nWindows Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  },
  {
    text: "Opettajan lähettämä sähköposti, jossa on liitteenä PDF-tehtävä",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN\nTarkista silti aina, että liitteet tulevat odotetuilta henkilöiltä",
    wrongMessage: "Tämä on TURVALLINEN\nTarkista silti aina, että liitteet tulevat odotetuilta henkilöiltä",
    tip: "Luota vaistoihisi - jos jokin tuntuu oudolta, se todennäköisesti on sitä!"
  }
];

let currentIndex = 0;
let correctCount = 0;
let answeredCount = 0;
let points = 0;
const pointsPerCorrect = 25;
let questionStartTime = null;

const maxPoints = scenarios.length * pointsPerCorrect;

// ----- elementit -----
const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const correctCountEl = document.getElementById("correctCount");
const answeredCountEl = document.getElementById("answeredCount");
const lastTimeEl = document.getElementById("lastTime");

const scenarioTextEl = document.getElementById("scenarioText");

const btnSafe = document.getElementById("btnSafe");
const btnThreat = document.getElementById("btnThreat");

const feedbackSection = document.getElementById("feedbackSection");
const feedbackBox = document.getElementById("feedbackBox");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const tipTextEl = document.getElementById("tipText");

const quizPanel = document.getElementById("quizPanel");
const resultScreen = document.getElementById("resultScreen");
const resultScoreText = document.getElementById("resultScoreText");
const resultComment = document.getElementById("resultComment");
const resultPointsText = document.getElementById("resultPointsText");
const resultEmoji = document.getElementById("resultEmoji");
const retryBtn = document.getElementById("retryBtn");


qTotalEl.textContent = scenarios.length.toString();
correctCountEl.textContent = "0";
answeredCountEl.textContent = "0";
lastTimeEl.textContent = "–";

let nextTimeoutId = null;


function showScenario(index) {
  const s = scenarios[index];
  scenarioTextEl.textContent = s.text;
  tipTextEl.textContent = "💡 " + s.tip;

  qIndexEl.textContent = index + 1;

  feedbackSection.classList.add("hidden");
  feedbackBox.classList.remove("correct", "wrong");
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";

  btnSafe.disabled = false;
  btnThreat.disabled = false;

  btnSafe.focus();

  questionStartTime = performance.now();
}

function clearNextTimeout() {
  if (nextTimeoutId !== null) {
    clearTimeout(nextTimeoutId);
    nextTimeoutId = null;
  }
}

function handleAnswer(isThreatAnswer) {
  if (btnSafe.disabled && btnThreat.disabled) return;

  const s = scenarios[currentIndex];
  const correct = isThreatAnswer === s.isThreat;

  const endTime = performance.now();
  const seconds = (endTime - questionStartTime) / 1000;
  const secondsFixed = seconds.toFixed(1);
  lastTimeEl.textContent = secondsFixed;

  btnSafe.disabled = true;
  btnThreat.disabled = true;

  answeredCount++;
  answeredCountEl.textContent = answeredCount.toString();

  feedbackBox.classList.remove("correct", "wrong");

  if (correct) {
    correctCount++;
    points += pointsPerCorrect;
    correctCountEl.textContent = correctCount.toString();

    feedbackBox.classList.add("correct");
    feedbackTitle.textContent = "✅ Oikein!";
    feedbackText.innerHTML =
      s.rightMessage.replace(/\n/g, "<br>") +
      "<br><br>⏱ Reaktioaika: " +
      secondsFixed +
      "s";
  } else {
    feedbackBox.classList.add("wrong");
    feedbackTitle.textContent = "❌ Ei aivan!";
    feedbackText.innerHTML =
      s.wrongMessage.replace(/\n/g, "<br>") +
      "<br><br>⏱ Reaktioaika: " +
      secondsFixed +
      "s";
  }

  feedbackSection.classList.remove("hidden");

  clearNextTimeout();

  if (currentIndex >= scenarios.length - 1) {
    nextTimeoutId = setTimeout(finishGame, 1800);
  } else {
    nextTimeoutId = setTimeout(() => {
      currentIndex++;
      showScenario(currentIndex);
    }, 1800);
  }
}

function finishGame() {
  quizPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScoreText.textContent = `${correctCount} / ${scenarios.length} oikein`;

  const ratio = correctCount / scenarios.length;
  let comment;
  let emoji = "👏";

  if (ratio === 1) {
    comment = "Täydellinen suoritus, agentti!";
    emoji = "🏅";
  } else if (ratio >= 0.7) {
    comment = "Erinomainen suoritus, agentti!";
    emoji = "🌟";
  } else if (ratio >= 0.4) {
    comment = "Hyvä alku – jatka harjoittelua!";
    emoji = "👍";
  } else {
    comment = "Uhka-analyysi vaatii vielä harjoitusta.";
    emoji = "⚠️";
  }

  resultComment.textContent = comment;
  resultEmoji.textContent = emoji;
  resultPointsText.textContent = `+${points} pistettä`;

  savePoints(points);

  retryBtn.focus();
}

function restartGame() {
  clearNextTimeout();

  currentIndex = 0;
  correctCount = 0;
  answeredCount = 0;
  points = 0;

  correctCountEl.textContent = "0";
  answeredCountEl.textContent = "0";
  lastTimeEl.textContent = "–";

  resultScreen.classList.add("hidden");
  quizPanel.classList.remove("hidden");

  showScenario(currentIndex);
}

btnSafe.addEventListener("click", () => handleAnswer(false));
btnThreat.addEventListener("click", () => handleAnswer(true));
retryBtn.addEventListener("click", restartGame);

// ----- näppäimistöohjaus -----
// Kysymys aktiivinen (napit eivät disabloitu):
//   T / ← = TURVALLINEN
//   U / → = UHKA
//
// Aina:
//   Esc / B = Takaisin missiolistaan
//
// Tulosnäyttö näkyvissä:
//   R / Enter = Uudelleensuorita missio
//
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lower = key.toLowerCase();

  const quizVisible = !quizPanel.classList.contains("hidden");
  const resultVisible = !resultScreen.classList.contains("hidden");

  const handledKeys = [
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "Enter",
    "t",
    "u",
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
    if (!btnSafe.disabled && !btnThreat.disabled) {
      if (lower === "t" || key === "ArrowLeft") {
        handleAnswer(false); // TURVALLINEN
        return;
      }
      if (lower === "u" || key === "ArrowRight") {
        handleAnswer(true); // UHKA
        return;
      }
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
  document.addEventListener("DOMContentLoaded", () => {
    initHighContrastToggle();
    showScenario(currentIndex);
  });
} else {
  initHighContrastToggle();
  showScenario(currentIndex);
}
