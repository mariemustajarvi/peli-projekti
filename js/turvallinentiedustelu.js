const sites = [
  {
    url: "https://www.amazon.com",
    isSafe: true,
    rightExplanation:
      "Tämä verkkosivusto on turvallinen! ✅\n" +
      "Tämä näyttää oikealta Amazon-verkkokaupalta.",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä verkkosivusto on oikeasti turvallinen.",
    indicators: [
      "HTTPS-yhteys (lukko-ikoni)",
      "Aito verkkotunnus amazon.com",
      "Tunnettu ja luotettava palvelu"
    ],
    tips: [
      "Etsi HTTPS ja lukko-ikoni selaimesta",
      "Tarkista verkkotunnuksen oikeinkirjoitus",
      "Suuret palvelut käyttävät omia, selkeitä domaineja"
    ]
  },
  {
    url: "http://amaz0n-deals.biz/login",
    isSafe: false,
    rightExplanation:
      "Oikein! 🎉\n" +
      "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä sivu on itse asiassa vaarallinen huijaussivu.",
    indicators: [
      "⚠️ HTTP (ei turvallinen)",
      "❌ Väärin kirjoitettu verkkotunnus (amaz0n)",
      "❌ Epäilyttävä .biz-pääte",
      "❌ Pyytää kirjautumista"
    ],
    tips: [
      "• Ei HTTPS tarkoittaa että tietoja ei salata",
      "• Verkkotunnus käyttää nollaa 'o':n sijaan",
      "• Älä koskaan syötä salasanoja HTTP-sivustoillaÄlä seuraa tukilinkkejä sähköpostista – kirjoita osoite itse"
    ]
  },
  {
    url: "https://www.wikipedia.org",
    isSafe: true,
    rightExplanation:
      "Oikein! 🎉\n" +
      "Tämä verkkosivusto on turvallinen!",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä sivu on turvallinen",
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
    rightExplanation:
      "Oikein! 🎉\n" +
      "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä verkkosivusto on epäturvallinen!",
    indicators: [
      "⚠️ HTTP (ei turvallinen)",
      "❌ Liian hyvältä kuulostaakseen totta -tarjous",
      "❌ Epäilyttävä .ru-verkkotunnus",
      "❌ 'Free' URL:ssa"
    ],
    tips: [
      "• Vältä sivustoja, jotka lupaavat ilmaisia kalliita tuotteita",
      "• Ole varovainen ulkomaisten verkkotunnusten kanssa",
      "• Mikään aito yritys ei anna ilmaisia iPhonejä",
      "• HTTP tarkoittaa että tietosi ovat alttiina"
    ]
  },
  {
    url: "https://bank0famerica.com/login",
    isSafe: false,
    rightExplanation:
      "Oikein! 🎉\n" +
      "Tämä verkkosivusto on epäturvallinen!",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä verkkosivusto on epäturvallinen!",
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
    rightExplanation:
      "Oikein! 🎉\n" +
      "Tämä verkkosivusto on turvallinen!",
    wrongExplanation:
      "Ei aivan! ❌\n" +
      "Tämä sivu on turvallinen.",
    indicators: [
      "🔒 HTTPS-yhteys",
      "✅ Aito Google-palvelu",
      "✅ Oikea kirjoitusasu"
    ],
    tips: [
      "• YouTube on luotettava alusta",
      "• Vahvista aina että olet oikealla sivustolla",
      "• Etsi lukkokuvake"
    ]
  }
];

// ----- tila -----

let currentIndex = 0;
let correctCount = 0;
let points = 0;
const pointsPerCorrect = 25;
const maxPoints = sites.length * pointsPerCorrect;

// elementit

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

// alusta yläosan numerot
qTotalEl.textContent = sites.length;
maxPointsEl.textContent = maxPoints.toString();
pointsEl.textContent = points.toString();

// ----- funktiot -----

function showSite(index) {
  const site = sites[index];
  siteUrlEl.textContent = site.url;
  qIndexEl.textContent = index + 1;

  // nappien tila
  btnSafe.disabled = false;
  btnUnsafe.disabled = false;

  // näytä napit, piilota palaute
  feedbackSection.classList.add("hidden");

  // tyhjennä listat
  indicatorList.innerHTML = "";
  tipList.innerHTML = "";
}

function handleAnswer(isSafeAnswer) {
  const site = sites[currentIndex];
  const correct = isSafeAnswer === site.isSafe;

  btnSafe.disabled = true;
  btnUnsafe.disabled = true;

  if (correct) {
    correctCount++;
    points += pointsPerCorrect;
    pointsEl.textContent = points.toString();

    feedbackBox.classList.remove("wrong");
    feedbackBox.classList.add("correct");
    feedbackTitle.textContent = "✅ Oikein!";
    feedbackText.innerHTML = site.rightExplanation.replace(/\n/g, "<br>");
  } else {
    feedbackBox.classList.remove("correct");
    feedbackBox.classList.add("wrong");
    feedbackTitle.textContent = "❌ Ei aivan!";
    feedbackText.innerHTML = site.wrongExplanation.replace(/\n/g, "<br>");
  }

  // täytä indikaattorit ja vinkit
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
    emoji = "👍";
  }
  resultComment.textContent = comment;
  resultEmoji.textContent = emoji;
  resultPointsText.textContent = `+${points} pistettä`;
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

function nextSite() {
  if (currentIndex >= sites.length - 1) {
    finishGame();
    return;
  }
  currentIndex++;
  showSite(currentIndex);
}


btnSafe.addEventListener("click", () => handleAnswer(true));
btnUnsafe.addEventListener("click", () => handleAnswer(false));
nextBtn.addEventListener("click", nextSite);
retryBtn.addEventListener("click", restartGame);

// käynnistä peli
showSite(currentIndex);
