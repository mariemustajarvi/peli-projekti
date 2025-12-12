const allQuestions = [
  {
    text: 'On ok klikata "Hyväksy kaikki evästeet" jokaisella verkkosivustolla',
    isTrue: false,
    feedback:
      "Tarkista evästeasetukset! Monet evästeet seuraavat toimintaasi verkkosivustoilla."
  },
  {
    text: "HTTPS-verkkosivustot ovat aina 100% turvallisia ja luotettavia",
    isTrue: false,
    feedback:
      "HTTPS tarkoittaa vain, että yhteys on salattu. Tietojenkalastelusivustotkin voivat käyttää HTTPS:ää!"
  },
  {
    text: "Sijaintipalveluiden sammuttaminen estää kaiken seurannan täysin",
    isTrue: false,
    feedback:
      "Sovellukset ja verkkosivustot voivat silti seurata sinua IP-osoitteen, Wi-Fi-verkkojen ja muiden menetelmien kautta."
  },
  {
    text:
      "On turvallista käyttää samaa salasanaa kaikilla tileillä, jos se on vahva salasana",
    isTrue: false,
    feedback:
      "Älä koskaan käytä samaa salasanaa uudelleen! Jos yksi tili murretaan, kaikki tilisi ovat vaarassa."
  },
  {
    text: "Vahvan salasanan pitäisi olla vähintään 12 merkkiä pitkä",
    isTrue: true,
    feedback:
      "Pidemmät salasanat ovat paljon vaikeampia murtaa."
  },
  {
    text:
      "Salasananhallinta on vähemmän turvallinen kuin kaikkien salasanojen muistaminen",
    isTrue: false,
    feedback:
      "Salasananhallinnat ovat erittäin turvallisia ja antavat sinun käyttää ainutlaatuisia vahvoja salasanoja kaikkialla!"
  },
  {
    text: "Kaksivaiheinen tunnistautuminen tekee tileistäsi turvallisempia",
    isTrue: true,
    feedback:
      "2FA lisää ylimääräisen turvakerroksen, vaikka salasanasi varastettaisiin."
  },
  {
    text:
      "Sinun pitäisi jakaa salasanasi parhaan ystäväsi kanssa siltä varalta, että unohdat sen",
    isTrue: false,
    feedback:
      "Älä koskaan jaa salasanoja kenenkään kanssa! Käytä sen sijaan salasananhallintaa."
  },
  {
    text:
      "Sinun pitäisi olla epäluuloinen sähköposteista, jotka pyytävät sinua toimimaan kiireellisesti",
    isTrue: true,
    feedback:
      "Kiireellisyyden luominen on yleinen tietojenkalastelutaktiikka saadakseen sinut toimimaan ajattelematta."
  },
  {
    text:
      "Julkiset Wi-Fi-verkot ovat turvallisia verkkopankkitoimintaan, jos ne vaativat salasanan",
    isTrue: false,
    feedback:
      "Julkinen Wi-Fi ei ole koskaan turvallinen arkaluontoisiin toimintoihin, vaikka se vaatisi salasanan. Käytä aina VPN:ää."
  },
  {
    text:
      "Sinun pitäisi päivittää ohjelmistosi ja sovelluksesi säännöllisesti turvallisuuden vuoksi",
    isTrue: true,
    feedback:
      "Päivitykset sisältävät usein tärkeitä tietoturvakorjauksia, jotka korjaavat haavoittuvuuksia."
  },
  {
    text: "Uloskirjautuminen on tarpeetonta henkilökohtaisilla laitteilla",
    isTrue: false,
    feedback:
      "Kirjaudu aina ulos, erityisesti arkaluontoisista tileistä. Laitteesi voidaan varastaa tai joku muu voi käyttää sitä."
  },
  {
    text: "Yksityinen selaustila tekee sinusta täysin nimettömän verkossa",
    isTrue: false,
    feedback:
      "Yksityinen tila piilottaa vain historiasi paikallisesti. Internet-palveluntarjoajasi ja verkkosivustot voivat silti seurata sinua."
  },
  {
    text: "Tietojen varmuuskopiointi suojaa sinua kiristysohjelmistolta",
    isTrue: true,
    feedback:
      "Säännölliset varmuuskopiot tarkoittavat, että voit palauttaa tiedostosi maksamatta lunnaita."
  }
];

const QUESTION_COUNT = 10;
const ROUND_TIME = 15; 

let roundQuestions = [];

let currentIndex = 0;
let correctCount = 0;
let timeLeft = ROUND_TIME;
let timerId = null;
let roundActive = false;


const container = document.querySelector(".container");

const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const correctCountEl = document.getElementById("correctCount");

const statementTextEl = document.getElementById("statementText");

const timeLeftEl = document.getElementById("timeLeft");
const timeBarEl = document.getElementById("timeBar");

const btnTrue = document.getElementById("btnTrue");
const btnFalse = document.getElementById("btnFalse");

const feedbackBox = document.getElementById("feedbackBox");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");

const quizPanel = document.getElementById("quizPanel");
const resultScreen = document.getElementById("resultScreen");

const resultScoreText = document.getElementById("resultScoreText");
const resultComment = document.getElementById("resultComment");
const resultPointsText = document.getElementById("resultPointsText");
const resultEmoji = document.getElementById("resultEmoji");
const retryBtn = document.getElementById("retryBtn");


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildRoundQuestions() {
  const copy = allQuestions.slice(); 
  shuffle(copy);
  roundQuestions = copy.slice(0, QUESTION_COUNT);
  qTotalEl.textContent = roundQuestions.length.toString(); // 10
}


function updateTimerUI() {
  const percent = (timeLeft / ROUND_TIME) * 100;
  timeBarEl.style.width = `${percent}%`;
  timeLeftEl.textContent = Math.ceil(timeLeft).toString();
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  timeLeft = ROUND_TIME;
  updateTimerUI();
  stopTimer();

  timerId = setInterval(() => {
    timeLeft -= 0.05; // 50ms välein
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerUI();
      stopTimer();
      if (roundActive) handleTimeout();
    } else {
      updateTimerUI();
    }
  }, 50);
}


function showQuestion(index) {
  const q = roundQuestions[index];

  qIndexEl.textContent = (index + 1).toString();
  statementTextEl.textContent = q.text;

  feedbackBox.classList.add("hidden");
  feedbackBox.classList.remove("correct", "wrong");
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";

  btnTrue.disabled = false;
  btnFalse.disabled = false;

  roundActive = true;
  startTimer();
}

function endRound() {
  roundActive = false;
  btnTrue.disabled = true;
  btnFalse.disabled = true;
  stopTimer();
}

function handleAnswer(userSaysTrue) {
  if (!roundActive) return;

  endRound();

  const q = roundQuestions[currentIndex];
  const correct = userSaysTrue === q.isTrue;

  feedbackBox.classList.remove("hidden");
  feedbackBox.classList.remove("correct", "wrong");

  if (correct) {
    correctCount++;
    correctCountEl.textContent = correctCount.toString();
    feedbackBox.classList.add("correct");
    feedbackTitle.textContent = "✅ Oikein!";
  } else {
    feedbackBox.classList.add("wrong");
    feedbackTitle.textContent = "❌ Ei aivan!";
  }

  feedbackText.textContent = q.feedback;

  setTimeout(nextQuestion, 1500);
}

function handleTimeout() {
  endRound();

  feedbackBox.classList.remove("hidden");
  feedbackBox.classList.remove("correct", "wrong");
  feedbackBox.classList.add("wrong");
  feedbackTitle.textContent = "⏱ Aika loppui!";
  feedbackText.textContent = "Et saanut pistettä tästä analyysistä.";

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= roundQuestions.length) {
    finishGame();
  } else {
    showQuestion(currentIndex);
  }
}

function finishGame() {
  roundActive = false;
  stopTimer();

  container.classList.add("result-active");
  quizPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScoreText.textContent = `${correctCount} / ${roundQuestions.length} oikein`;

  const ratio = correctCount / roundQuestions.length;
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

  resultComment.textContent = comment;
  resultEmoji.textContent = emoji;

const maxPoints = 250;
const pointsPerCorrect = Math.floor(maxPoints / roundQuestions.length); // 25
let points = correctCount * pointsPerCorrect;

// 250 pistettä
if (correctCount === roundQuestions.length) points = maxPoints;

resultPointsText.textContent = `+${points} pistettä`;

  if (retryBtn) retryBtn.focus();
}

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

function restartGame() {
  stopTimer();

  currentIndex = 0;
  correctCount = 0;
  correctCountEl.textContent = "0";

  buildRoundQuestions();

  container.classList.remove("result-active");
  resultScreen.classList.add("hidden");
  quizPanel.classList.remove("hidden");

  showQuestion(currentIndex);
}

btnTrue.addEventListener("click", () => handleAnswer(true));
btnFalse.addEventListener("click", () => handleAnswer(false));
if (retryBtn) retryBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lower = key.toLowerCase();
  const resultVisible = !resultScreen.classList.contains("hidden");

  const handledKeys = [
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "Enter",
    " ",
    "t",
    "f",
    "r",
    "b"
  ];

  if (handledKeys.includes(key) || handledKeys.includes(lower)) {
    event.preventDefault();
  }

  if (!resultVisible) {
    if (lower === "t" || key === "ArrowLeft") {
      handleAnswer(true);
      return;
    }

    if (lower === "f" || key === "ArrowRight") {
      handleAnswer(false);
      return;
    }

    if (key === "Escape" || lower === "b") {
      window.location.href = "index.html";
      return;
    }

    return;
  }

  if (resultVisible) {
    if (lower === "r" || key === "Enter") {
      restartGame();
      return;
    }

    if (key === "Escape" || lower === "b") {
      window.location.href = "index.html";
      return;
    }
  }
});


function init() {
  initHighContrastToggle();
  buildRoundQuestions();
  correctCountEl.textContent = "0";
  showQuestion(currentIndex);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
