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
        oldScore = data.scores[1];
        const updates = {};
        if (points > oldScore) {
          updates['/scores/1/'] = points;
        }
        updates['completedMissions/1/'] = true;
        update(userRef, updates)
      }
    });
  }
};

const messages = [
  {
    sender: "turvallisuus@amaz0n-tuki.com",
    subject: "KIIREELLINEN: Tilisi suljetaan!",
    body: "Hyvä asiakas, \nHavaitsimme epäilyttävää toimintaa tililläsi. Klikkaa tästä välittömästi vahvistaaksesi henkilöllisyytesi tai tilisi suljetaan pysyvästi 24 tunnin kuluessa!",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
        "\n" +
      "• Väärin kirjoitettu verkkotunnus (amaz0n amazon-sijaan)\n" +
      "• Luo kiireellisyyttä ja pelkoa\n" +
      "• Pyytää klikkaamaan linkkiä\n" +
      "• Ei personointia (yleinen 'asiakas')",
    wrongExplanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit:\n" +
            "\n" +
      "• Väärin kirjoitettu verkkotunnus (amaz0n amazon-sijaan)\n" +
      "• Luo kiireellisyyttä ja pelkoa\n" +
      "• Pyytää klikkaamaan linkkiä\n" +
      "• Ei personointia (yleinen 'asiakas')"
  },
  {
    sender: "tuki@paypa1-turvallisuus.com",
    subject: "Vahvista maksutietosi",
    body:
      "Hei,\nHavaitsimme epätavallisia kirjautumisyrityksiä PayPal-tilillesi Nigeriasta. Vahvista henkilöllisyytesi klikkaamalla alla olevaa turvallista linkkiä ja syöttämällä kaikki tilitietosi mukaan lukien salasana ja turvallisuuskysymykset.",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Käyttää numeroa '1' kirjaimen 'l' sijasta paypal-sanassa\n" +
      "• Pyytää salasanaa ja turvallisuuskysymyksiä\n" +
      "• Mainitsee pelottavan sijainnin luodakseen pelkoa\n" +
      "• Oikeat yritykset eivät koskaan kysy salasanoja sähköpostitse",
    wrongExplanation:
      "Tämä viesti on tietojenkalasteluyritys!" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Käyttää numeroa '1' kirjaimen 'l' sijasta paypal-sanassa\n" +
      "• Pyytää salasanaa ja turvallisuuskysymyksiä\n" +
      "• Mainitsee pelottavan sijainnin luodakseen pelkoa\n" +
      "• Oikeat yritykset eivät koskaan kysy salasanoja sähköpostitse"
  },
  {
    sender: "noreply@discord.com",
    subject: "Ilmainen Discord Nitro -lahja",
    body:
      "Hei pelaaja,\nHei pelaaja! Sinut on valittu saamaan ILMAINEN Discord Nitro -tilaus! Tämä eksklusiivinen tarjous vanhenee 1 tunnissa. Klikkaa linkkiä ja kirjaudu lunastaksesi: http://discordnitro-ilmainen.ru/lunasta",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Luo väärää kiireellisyyttä (1 tunti)\n" +
      "• Epäilyttävä linkin verkkotunnus (.ru)\n" +
      "• Liian hyvää ollakseen totta (ilmainen premium)\n" +
      "• Linkki ei vastaa oikeaa Discord-verkkotunnusta",
    wrongExplanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Luo väärää kiireellisyyttä (1 tunti)\n" +
      "• Epäilyttävä linkin verkkotunnus (.ru)\n" +
      "• Liian hyvää ollakseen totta (ilmainen premium)\n" +
      "• Linkki ei vastaa oikeaa Discord-verkkotunnusta"
  },
  {
    sender: "ilmoitukset@github.com",
    subject: "Uusi tähti projektiisi",
    body:
      "Joku merkitsi projektisi 'MahtavaAppini' tähdellä! Katso toiminta projektissasi osoitteessa github.com/käyttäjänimi/MahtavaAppini",
    isPhishing: false,
    explanation:
      "Tämä viesti on turvallinen!\n" +
      "\n" +
      "✅ Turvallisuusindikaattorit:\n" +
            "\n" +
      "• Aito verkkotunnus (github.com)\n" +
      "• Normaali ilmoitus ilman kiireellistä toimintaa\n" +
      "• Ei pyyntöjä henkilökohtaisista tiedoista\n" +
      "• Aito palveluilmoitus",
    wrongExplanation:
      "Tämä viesti on oikeasti turvallinen!\n" +
      "\n" +
      "✅ Turvallisuusindikaattorit:\n" +
            "\n" +
      "• Aito verkkotunnus (github.com)\n" +
      "• Normaali ilmoitus ilman kiireellistä toimintaa\n" +
      "• Ei pyyntöjä henkilökohtaisista tiedoista\n" +
      "• Aito palveluilmoitus"
  },
  {
    sender: "admin@kouluportaali.fi",
    subject: "Arvosanasi on päivitetty",
    body:
      "Hei Aleksi,\nOpettajasi päivitti matematiikan arvosanasi arvosanaksi 9. Kirjaudu sisään nähdäksesi päivitetyn todistuksesi. Mukavaa päivää!",
    isPhishing: false,
    explanation:
      "Tämä viesti on turvallinen!\n" +
      "\n" +
      "✅ Turvallisuusindikaattorit:\n" +
            "\n" +
      "• Koulun verkkotunnus (.fi)\n" +
      "• Personoitu nimellä\n" +
      "• Normaali kouluviestintä\n" +
      "• Ei epäilyttäviä pyyntöjä",
    wrongExplanation:
      "Tämä viesti on oikeasti turvallinen!\n" +
      "\n" +
      "✅ Turvallisuusindikaattorit:\n" +
            "\n" +
      "• Koulun verkkotunnus (.fi)\n" +
      "• Personoitu nimellä\n" +
      "• Normaali kouluviestintä\n" +
      "• Ei epäilyttäviä pyyntöjä"
  },
  {
    sender: "hr@yritys-edut.net",
    subject: "Päivitä verolomakkeesi - Toimenpiteitä vaaditaan",
    body:
      "Hyvä työntekijä, Verottaja vaatii kaikkien työntekijöiden päivittävän verokorttinsa välittömästi. Lataa ja täytä liitetty lomake henkilötunnuksellasi, pankkitilillä ja tilinumerolla. Noudattamatta jättäminen 48 tunnin kuluessa voi johtaa sakkoihin.",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Epäilyttävä verkkotunnus (ei virallinen yritys)\n" +
      "• Pyytää henkilötunnusta ja pankkitietoja\n" +
      "• Luo pelkoa sakkoista\n" +
      "• Yleinen 'Hyvä työntekijä' tervehdys\n" +
      "• Verottaja ei ota yhteyttä työntekijöiden sähköposteilla",
    wrongExplanation:
      "Tämä viesti on tietojenkalasteluyritys!\n" +
      "\n" +
      "🚩 Varoitusmerkit\n" +
            "\n" +
      "• Epäilyttävä verkkotunnus (ei virallinen yritys)\n" +
      "• Pyytää henkilötunnusta ja pankkitietoja\n" +
      "• Luo pelkoa sakkoista\n" +
      "• Yleinen 'Hyvä työntekijä' tervehdys\n" +
      "• Verottaja ei ota yhteyttä työntekijöiden sähköposteilla"
  }
];

let currentIndex = 0;
let score = 0;

const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const scoreEl = document.getElementById("score");
const maxScoreEl = document.getElementById("maxScore");

const senderEl = document.getElementById("sender");
const subjectEl = document.getElementById("subject");
const bodyEl = document.getElementById("bodyText");

const btnSafe = document.getElementById("btnSafe");
const btnPhish = document.getElementById("btnPhish");

const feedbackBox = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const nextBtn = document.getElementById("nextBtn");

const answersBox = document.querySelector(".answers");
const quizPanel = document.getElementById("quizPanel");
const resultScreen = document.getElementById("resultScreen");
const resultScoreText = document.getElementById("resultScoreText");
const resultComment = document.getElementById("resultComment");
const resultPointsText = document.getElementById("resultPointsText");
const retryBtn = document.getElementById("retryBtn");

qTotalEl.textContent = messages.length;
maxScoreEl.textContent = messages.length.toString();

function showMessage(index) {
  const msg = messages[index];
  senderEl.textContent = msg.sender;
  subjectEl.textContent = msg.subject;
  bodyEl.innerHTML = msg.body.replace(/\n/g, "<br>");

  qIndexEl.textContent = index + 1;

  btnSafe.disabled = false;
  btnPhish.disabled = false;

  answersBox.classList.remove("hidden");
  feedbackBox.classList.add("hidden");

  feedbackTitle.textContent = "";
  feedbackText.textContent = "";
  feedbackBox.classList.remove("correct", "wrong");

  btnSafe.focus();
}

function handleAnswer(isPhishingAnswer) {
  if (btnSafe.disabled && btnPhish.disabled) return;

  const msg = messages[currentIndex];
  const correct = isPhishingAnswer === msg.isPhishing;

  if (correct) {
    score++;
    scoreEl.textContent = score.toString();
    feedbackTitle.textContent = "✅ Hienoa työtä! 🎉";
    feedbackBox.classList.remove("wrong");
    feedbackBox.classList.add("correct");
    feedbackText.innerHTML = msg.explanation.replace(/\n/g, "<br>");
  } else {
    feedbackTitle.textContent = "Tällä kertaa meni väärin.";
    feedbackBox.classList.remove("correct");
    feedbackBox.classList.add("wrong");
    feedbackText.innerHTML = msg.wrongExplanation.replace(/\n/g, "<br>");
  }

  btnSafe.disabled = true;
  btnPhish.disabled = true;

  answersBox.classList.add("hidden");
  feedbackBox.classList.remove("hidden");

  if (currentIndex >= messages.length - 1) {
    nextBtn.textContent = "VALMIS";
  } else {
    nextBtn.textContent = "Seuraava viesti →";
  }

  nextBtn.focus();
}

function finishGame() {
  quizPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScoreText.textContent = `${score} / ${messages.length} oikein`;

  let comment;
  const ratio = score / messages.length;
  if (ratio === 1) {
    comment = "Täydellinen suoritus, agentti!";
  } else if (ratio >= 0.7) {
    comment = "Hyvä työ, agentti!";
  } else {
    comment = "Harjoitus tekee mestarin – kokeile uudelleen!";
  }
  resultComment.textContent = comment;

  const pointsPerCorrect = 25;
  const points = score * pointsPerCorrect;

  savePoints(points);

  resultPointsText.textContent = `+${points} pistettä`;

  retryBtn.focus();
}

function restartGame() {
  score = 0;
  currentIndex = 0;
  scoreEl.textContent = "0";
  qIndexEl.textContent = "1";
  nextBtn.textContent = "Seuraava viesti →";

  resultScreen.classList.add("hidden");
  quizPanel.classList.remove("hidden");

  showMessage(currentIndex);
}

function nextMessage() {
  if (currentIndex >= messages.length - 1) {
    finishGame();
    return;
  }
  currentIndex++;
  showMessage(currentIndex);
}

btnSafe.addEventListener("click", () => handleAnswer(false));
btnPhish.addEventListener("click", () => handleAnswer(true));
nextBtn.addEventListener("click", nextMessage);
retryBtn.addEventListener("click", restartGame);

// -------------------------
// Näppäimistöohjaus
// -------------------------
// Kysymysvaihe (palaute piilossa):
//   T / ← = TURVALLINEN VIESTI
//   U / → = TIETOJENKALASTELU
//
// Palaute näkyvissä:
//   Enter / Space / N = Seuraava viesti / tulos
//
// Tulosnäyttö:
//   R / Enter = Uudelleensuorita missio
//
// Aina:
//   Esc / B = Takaisin missiolistaan
//
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lower = key.toLowerCase();

  const quizVisible = !quizPanel.classList.contains("hidden");
  const resultVisible = !resultScreen.classList.contains("hidden");
  const feedbackVisible = !feedbackBox.classList.contains("hidden");

  const handledKeys = [
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "Enter",
    " ",
    "t",
    "u",
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
      if (!btnSafe.disabled && !btnPhish.disabled) {
        if (lower === "t" || key === "ArrowLeft") {
          handleAnswer(false); // turvallinen
          return;
        }
        if (lower === "u" || key === "ArrowRight") {
          handleAnswer(true); // phishing
          return;
        }
      }
      return;
    }

    if (key === "Enter" || key === " " || lower === "n") {
      nextMessage();
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
  document.addEventListener("DOMContentLoaded", () => {
    initHighContrastToggle();
    showMessage(currentIndex);
  });
} else {
  initHighContrastToggle();
  showMessage(currentIndex);
}
