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
        oldScore = data.scores[0];
        const updates = {};
        if (points > oldScore) {
          updates['/scores/0/'] = points;
        }
        updates['completedMissions/0/'] = true;
        update(userRef, updates);
      }
    });
  }
};

const CHALLENGE_COUNT = 3;

const challengeGoals = {
  1: "weak",
  2: "medium",
  3: "strong"
};

const challengeTexts = {
  1: {
    icon: "🧪",
    title: "Tehtävä 1: Tunnista heikko salasana",
    text: "Luo salasana joka murttuu helposti. Testaa järjestelmän haavoittuvuutta."
  },
  2: {
    icon: "🎯",
    title: "Tehtävä 2: Luo keskitason salasana",
    text: "Paranna suojausta lisäämällä numeroita ja isoja kirjaimia."
  },
  3: {
    icon: "🛡",
    title: "Tehtävä 3: Luo agenttitason salasana",
    text: "Maksimi suojaus vaaditaan: pitkä, monipuolinen ja arvaamaton."
  }
};

// tulokset talteen
const challengeResults = {}; // {1: {password, level, correct, eval}, ...}

let currentChallenge = 1;


const challengeIndexEl = document.getElementById("challengeIndex");
const challengeTotalEl = document.getElementById("challengeTotal");

const taskIconEl = document.getElementById("taskIcon");
const taskTitleEl = document.getElementById("taskTitle");
const taskTextEl = document.getElementById("taskText");

const passwordInput = document.getElementById("passwordInput");
const toggleVisibilityBtn = document.getElementById("toggleVisibilityBtn");

const strengthSection = document.getElementById("strengthSection");
const strengthLabelEl = document.getElementById("strengthLabel");
const strengthFillEl = document.getElementById("strengthFill");
const crackTimeTextEl = document.getElementById("crackTimeText");
const strengthListGoodEl = document.getElementById("strengthListGood");
const strengthListBadEl = document.getElementById("strengthListBad");

const nextChallengeBtn = document.getElementById("nextChallengeBtn");
const pwPanel = document.getElementById("pwPanel");
const resultScreen = document.getElementById("resultScreen");

const resultScoreText = document.getElementById("resultScoreText");
const resultComment = document.getElementById("resultComment");
const resultPointsText = document.getElementById("resultPointsText");
const resultEmoji = document.getElementById("resultEmoji");
const retryBtn = document.getElementById("retryBtn");

const resultPw1 = document.getElementById("resultPw1");
const resultPw2 = document.getElementById("resultPw2");
const resultPw3 = document.getElementById("resultPw3");
const resultSummary1 = document.getElementById("resultSummary1");
const resultSummary2 = document.getElementById("resultSummary2");
const resultSummary3 = document.getElementById("resultSummary3");

if (challengeTotalEl) {
  challengeTotalEl.textContent = CHALLENGE_COUNT.toString();
}

// -----------------------------
// Salasanan arviointi
// -----------------------------
/**
 * Palauttaa olion:
 * {
 *   level: "weak" | "medium" | "strong",
 *   label: "Heikko" | "Keskitaso" | "Vahva",
 *   time: "Murtamisaika: ...",
 *   strengths: string[],
 *   problems: string[],
 *   fill: 0–100
 * }
 */
function evaluatePassword(password) {
  const len = password.length;
  const hasLower = /[a-zåäö]/.test(password);
  const hasUpper = /[A-ZÅÄÖ]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^0-9A-Za-zÅÄÖåäö]/.test(password);

  let score = 0;

  // pituus
  if (len >= 4) score += 10;
  if (len >= 8) score += 20;
  if (len >= 12) score += 15;

  // merkkityypit
  if (hasLower) score += 10;
  if (hasUpper) score += 20;
  if (hasNumber) score += 20;
  if (hasSymbol) score += 25;

  // karkea tasojako
  let level, label, time;
  if (score < 35) {
    level = "weak";
    label = "Heikko";
    time = "Murtamisaika: Päiviä";
  } else if (score < 70) {
    level = "medium";
    label = "Keskitaso";
    time = "Murtamisaika: Kuukausia";
  } else {
    level = "strong";
    label = "Vahva";
    time = "Murtamisaika: Vuosisatoja";
  }

  const strengths = [];
  const problems = [];

  if (hasLower) strengths.push("Sisältää pieniä kirjaimia");
  else problems.push("Ei pieniä kirjaimia");

  if (hasUpper) strengths.push("Sisältää isoja kirjaimia");
  else problems.push("Ei isoja kirjaimia");

  if (hasNumber) strengths.push("Sisältää numeroita");
  else problems.push("Ei numeroita");

  if (hasSymbol) strengths.push("Sisältää erikoismerkkejä");
  else problems.push("Ei erikoismerkkejä");

  if (len >= 8) strengths.push("Riittävän pitkä (vähintään 8 merkkiä)");
  else problems.push("Liian lyhyt (alle 8 merkkiä)");

  if (level === "strong" && len < 12) {
    problems.push("Voisi olla vielä pidempi");
  }

  const fill = Math.min(100, Math.max(10, score));

  return {
    level,
    label,
    time,
    strengths,
    problems,
    fill
  };
}

function updateStrengthUI(password) {
  if (!password) {
    strengthSection.classList.add("hidden");
    strengthFillEl.style.width = "0%";
    crackTimeTextEl.textContent = "Murtamisaika: –";
    strengthListGoodEl.innerHTML = "";
    strengthListBadEl.innerHTML = "";
    return null;
  }

  const info = evaluatePassword(password);

  strengthSection.classList.remove("hidden");

  strengthLabelEl.textContent = info.label;
  strengthLabelEl.classList.remove(
    "pw-strength-label--weak",
    "pw-strength-label--medium",
    "pw-strength-label--strong"
  );
  if (info.level === "weak") {
    strengthLabelEl.classList.add("pw-strength-label--weak");
  } else if (info.level === "medium") {
    strengthLabelEl.classList.add("pw-strength-label--medium");
  } else {
    strengthLabelEl.classList.add("pw-strength-label--strong");
  }

  strengthFillEl.style.width = `${info.fill}%`;

  crackTimeTextEl.textContent = info.time;

  strengthListGoodEl.innerHTML = "";
  strengthListBadEl.innerHTML = "";

  info.strengths.forEach((txt) => {
    const li = document.createElement("li");
    li.textContent = txt;
    strengthListGoodEl.appendChild(li);
  });

  info.problems.forEach((txt) => {
    const li = document.createElement("li");
    li.textContent = txt;
    strengthListBadEl.appendChild(li);
  });

  return info;
}

function loadChallenge(index) {
  currentChallenge = index;
  challengeIndexEl.textContent = String(index);

  const data = challengeTexts[index];
  taskIconEl.textContent = data.icon;
  taskTitleEl.textContent = data.title;
  taskTextEl.textContent = data.text;

  passwordInput.value = "";
  updateStrengthUI("");

  if (index === CHALLENGE_COUNT) {
    nextChallengeBtn.textContent = "Näytä tulokset →";
  } else {
    nextChallengeBtn.textContent = "Seuraava haaste →";
  }

  passwordInput.focus();
}


function fillResultCard(idx, pwEl, summaryEl) {
  const res = challengeResults[idx];
  if (!res) {
    pwEl.textContent = "(ei salasanaa)";
    summaryEl.textContent = "";
    return;
  }

  pwEl.textContent = res.password || "(ei salasanaa)";
  summaryEl.classList.remove(
    "pw-result-card-summary--ok",
    "pw-result-card-summary--bad"
  );

  const goal = challengeGoals[idx];

  if (res.correct) {
    summaryEl.classList.add("pw-result-card-summary--ok");
    if (goal === "weak") {
      summaryEl.textContent = "Oikein! Tämä on heikko salasana.";
    } else if (goal === "medium") {
      summaryEl.textContent = "Oikein! Tämä on keskitason salasana.";
    } else {
      summaryEl.textContent = "Oikein! Tämä on agenttitason vahva salasana.";
    }
  } else {
    summaryEl.classList.add("pw-result-card-summary--bad");
    if (goal === "weak") {
      summaryEl.textContent = "Tämä ei ole tarpeeksi heikko salasana.";
    } else if (goal === "medium") {
      summaryEl.textContent = "Tämä ei vastaa keskitason vaatimuksia.";
    } else {
      summaryEl.textContent = "Tämä ei ole vielä tarpeeksi vahva agenttitasolle.";
    }
  }
}

function showResults() {
  pwPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let correctCount = 0;
  for (let i = 1; i <= CHALLENGE_COUNT; i++) {
    const res = challengeResults[i];
    if (res && res.correct) correctCount++;
  }

  const ratio = correctCount / CHALLENGE_COUNT;
  let comment;
  let emoji = "👏";

  if (ratio === 1) {
    comment = "Täydellinen suoritus, agentti!";
    emoji = "🤩";
  } else if (ratio >= 0.67) {
    comment = "Hyvää työtä, agentti!";
    emoji = "👍";
  } else {
    comment = "Harjoitus tekee mestarin – kokeile uudelleen!";
    emoji = "🧠";
  }

  resultEmoji.textContent = emoji;
  resultScoreText.textContent = `${correctCount} / ${CHALLENGE_COUNT} oikein`;
  resultComment.textContent = comment;

  const maxPoints = 100;
  const pointsPerCorrect = Math.round(maxPoints / CHALLENGE_COUNT); // 3 -> 33
  let points = correctCount * pointsPerCorrect;
  savePoints(points)
  if (correctCount === CHALLENGE_COUNT) points = maxPoints;

  resultPointsText.textContent = `+${points} pistettä`;



  fillResultCard(1, resultPw1, resultSummary1);
  fillResultCard(2, resultPw2, resultSummary2);
  fillResultCard(3, resultPw3, resultSummary3);

  retryBtn.focus();
}


function saveCurrentAndContinue() {
  const pw = passwordInput.value.trim();
  if (!pw) {
    alert("Syötä salasana ensin.");
    passwordInput.focus();
    return;
  }

  const evalRes = updateStrengthUI(pw);
  const expectedLevel = challengeGoals[currentChallenge];
  const correct = evalRes && evalRes.level === expectedLevel;

  challengeResults[currentChallenge] = {
    password: pw,
    level: evalRes ? evalRes.level : "unknown",
    eval: evalRes,
    correct
  };

  if (currentChallenge >= CHALLENGE_COUNT) {
    showResults();
  } else {
    loadChallenge(currentChallenge + 1);
  }
}

passwordInput.addEventListener("input", () => {
  updateStrengthUI(passwordInput.value);
});

toggleVisibilityBtn.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
  passwordInput.focus();
});

nextChallengeBtn.addEventListener("click", saveCurrentAndContinue);

retryBtn.addEventListener("click", () => {
  for (const key in challengeResults) {
    delete challengeResults[key];
  }
  currentChallenge = 1;
  resultScreen.classList.add("hidden");
  pwPanel.classList.remove("hidden");
  loadChallenge(1);
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lower = key.toLowerCase();

  const pwVisible = !pwPanel.classList.contains("hidden");
  const resultVisible = !resultScreen.classList.contains("hidden");

  if (key === "Escape" || lower === "b") {
    event.preventDefault();
    window.location.href = "index.html";
    return;
  }

  if (pwVisible && key === "Enter") {
    event.preventDefault();
    saveCurrentAndContinue();
    return;
  }

  if (resultVisible && lower === "r") {
    event.preventDefault();
    retryBtn.click();
    return;
  }
});

function init() {
  loadChallenge(1);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
