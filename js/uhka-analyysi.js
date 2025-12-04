const scenarios = [
  {
    text: "Google Chrome päivitys viralliselta asetussivulta",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    wrongMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    tip: "Google Chrome päivittyy sovelluksen omista asetuksista - tämä on oikea reitti"
  },
  {
    text: "Selaimesi on vanhentunut - lataa uusi versio tästä .exe-tiedostona",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA – Kategoria: xxxx.",
    wrongMessage: "Tämä on UHKA – Kategoria: xxxx.",
    tip: "Selain EI koskaan jaa päivitystä satunnaisella latauslinkillä. Tämä on yleinen malware-ansoitus."
  },
  {
    text: " Steam lähettää ilmoituksen: 'Kirjatuminen uudelta laitteelta - oliko tämä sinä?'",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    wrongMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    tip: "Steamin virallinen turvailmoitus näyttää yleensä tämän kysymyksen."
  },
  {
    text: "Discord Nitro -lahja tuntemattomasta linkistä",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA – Kategoria: xxxx.",
    wrongMessage: "Tämä on UHKA – Kategoria: xxxx.",
    tip: "Ilmaiset Nitro-linkit ovat lähes aina huijaus, joka varastaa tilin"
  },
  {
    text: "Windows Defender ilmoitus: Troijalainen poistettu onnistuneesti",
    isThreat: false,
    category: "Keskitasoinen uhka",
    rightMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    wrongMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    tip: "Windoes Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa."
  },
  {
    text: "Nettisivulle ilmestyy ponnahdus: 'Laitteesi on lukittu! Soita Microsoft-tukeen: +41....'",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA – Kategoria: xxxx.",
    wrongMessage: "Tämä on UHKA – Kategoria: xxxx.",
    tip: "Microsoft EI koskaan pyydä soittamaan numeroon. Klassinen tech-support -huijaus."
  },
  {
    text: "WhatsAppissa kaveri lähettää viestin: 'Onko tämä sinä videolle?' + epäilyttävä linkki",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA – Kategoria: xxxx.",
    wrongMessage: "Tämä on UHKA – Kategoria: xxxx.",
    tip: "Tili on näköisesti kaapattu ja linkki vie phishing-sivulle."
  },
  {
    text: "Sovellus pyytää luvan 'Päästä kaäsiksi koko mediasisältöösi ja kaikkiin tiedostoihin' vaikka se on taskulamppusovellus",
    isThreat: true,
    category: "Korkea uhka",
    rightMessage: "Tämä on UHKA – Kategoria: xxxx.",
    wrongMessage: "Tämä on UHKA – Kategoria: xxxx.",
    tip: "Lupa ei vastaa sovelluksen tarkoitusta --> viittaa väärinkäyttöön"
  },
  {
    text: "Windows Defender ilmoitus: 'Troijalainen poistettu onnistuneesti'",
    isThreat: false,
    category: "Korkea uhka",
    rightMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    wrongMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    tip: "Windows Defender antaa oikeita suojaviestejä järjestelmän omassa käyttöliittymässä, ei selaimessa."
  },
  {
    text: "Opettajan lähettämä sähköposti, jossa on liitteenä PDF-tehtävä",
    isThreat: false,
    category: "Normaali",
    rightMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    wrongMessage: "Tämä on TURVALLINEN - kategoria: xxx",
    tip: "Tarkista silti aina, että liitteet tulevat odotetuilta henkilöiltä."
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

// yläosan numerot
qTotalEl.textContent = scenarios.length.toString();
correctCountEl.textContent = "0";
answeredCountEl.textContent = "0";
lastTimeEl.textContent = "–";

// ----- funktiot -----
function showScenario(index) {
  const s = scenarios[index];
  scenarioTextEl.textContent = s.text;
  tipTextEl.textContent = "💡 " + s.tip;

  qIndexEl.textContent = index + 1;

  // resetoi palaute
  feedbackSection.classList.add("hidden");
  feedbackBox.classList.remove("correct", "wrong");
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";

  // aktivoi napit
  btnSafe.disabled = false;
  btnThreat.disabled = false;

  // aloitt ajastin
  questionStartTime = performance.now();
}

function handleAnswer(isThreatAnswer) {
  const s = scenarios[currentIndex];
  const correct = isThreatAnswer === s.isThreat;

  // reaktioaika
  const endTime = performance.now();
  const seconds = (endTime - questionStartTime) / 1000;
  const secondsFixed = seconds.toFixed(1);
  lastTimeEl.textContent = secondsFixed;

  btnSafe.disabled = true;
  btnThreat.disabled = true;

  answeredCount++;
  answeredCountEl.textContent = answeredCount.toString();

  if (correct) {
    correctCount++;
    points += pointsPerCorrect;
    correctCountEl.textContent = correctCount.toString();

    feedbackBox.classList.remove("wrong");
    feedbackBox.classList.add("correct");
    feedbackTitle.textContent = "✅ Oikein!";
    feedbackText.innerHTML =
      s.rightMessage.replace(/\n/g, "<br>") +
      "<br><br>⏱ Reaktioaika: " +
      secondsFixed +
      "s";
  } else {
    feedbackBox.classList.remove("correct");
    feedbackBox.classList.add("wrong");
    feedbackTitle.textContent = "❌ Ei aivan!";
    feedbackText.innerHTML =
      s.wrongMessage.replace(/\n/g, "<br>") +
      "<br><br>⏱ Reaktioaika: " +
      secondsFixed +
      "s";
  }

  feedbackSection.classList.remove("hidden");

 
  if (currentIndex >= scenarios.length - 1) {
    setTimeout(finishGame, 1800);
  } else {
    setTimeout(() => {
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
}

function restartGame() {
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


showScenario(currentIndex);
