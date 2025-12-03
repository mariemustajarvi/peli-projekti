const messages = [
  {
    sender: "turvallisuus@amaz0n-tuki.com",
    subject: "KIIREELLINEN: Tilisi suljetaan!",
    body: "Hyvä asiakas, \nHavaitsimme epäilyttävää toimintaa tililläsi. Klikkaa tästä välittömästi vahvistaaksesi henkilöllisyytesi tai tilisi suljetaan pysyvästi 24 tunnin kuluessa!",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Väärin kirjoitettu verkkotunnus (amaz0n amazon-sijaan)\n" +
      "���  Luo kiireellisyyttä ja pelkoa\n" +
      "���  Pyytää klikkaamaan linkkiä\n" +
      "���  Ei personointia (yleinen 'asiakas')",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Väärin kirjoitettu verkkotunnus (amaz0n amazon-sijaan)\n" +
      "��� Luo kiireellisyyttä ja pelkoa\n" +
      "��� Pyytää klikkaamaan linkkiä\n" +
      "��� Ei personointia (yleinen 'asiakas')"
  },
  {
    sender: "tuki@paypa1-turvallisuus.com",
    subject: "Vahvista maksutietosi",
    body:
      "Hei,\nHavaitsimme epätavallisia kirjautumisyrityksiä PayPal-tilillesi Nigeriasta. Vahvista henkilöllisyytesi klikkaamalla alla olevaa turvallista linkkiä ja syöttämällä kaikki tilitietosi mukaan lukien salasana ja turvallisuuskysymykset.",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Käyttää numeroa '1' kirjaimen 'l' sijasta paypal-sanassa\n" +
      "��� Pyytää salasanaa ja turvallisuuskysymyksiä\n" +
      "��� Mainitsee pelottavan sijainnin luodakseen pelkoa\n" +
      "��� Oikeat yritykset eivät koskaan kysy salasanoja sähköpostitse",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Käyttää numeroa '1' kirjaimen 'l' sijasta paypal-sanassa\n" +
      "��� Pyytää salasanaa ja turvallisuuskysymyksiä\n" +
      "��� Mainitsee pelottavan sijainnin luodakseen pelkoa\n" +
      "��� Oikeat yritykset eivät koskaan kysy salasanoja sähköpostitse"
  },

      {
    sender: "noreply@discord.com",
    subject: "Ilmainen Discord Nitro -lahja",
    body:
      "Hei pelaaja,\nHei pelaaja! Sinut on valittu saamaan ILMAINEN Discord Nitro -tilaus! Tämä eksklusiivinen tarjous vanhenee 1 tunnissa. Klikkaa linkkiä ja kirjaudu lunastaksesi: http://discordnitro-ilmainen.ru/lunasta",
    isPhishing: true,
    explanation:
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Luo väärää kiireellisyyttä (1 tunti)\n" +
      "��� Epäilyttävä linkin verkkotunnus (.ru)\n" +
      "��� Liian hyvää ollakseen totta (ilmainen premium)\n" +
      "��� Linkki ei vastaa oikeaa Discord-verkkotunnusta",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Luo väärää kiireellisyyttä (1 tunti)\n" +
      "��� Epäilyttävä linkin verkkotunnus (.ru)\n" +
      "��� Liian hyvää ollakseen totta (ilmainen premium)\n" +
      "��� Linkki ei vastaa oikeaa Discord-verkkotunnusta"
  },

      {
    sender: "ilmoitukset@github.com",
    subject: "Uusi tähti projektiisi",
    body:
      "Joku merkitsi projektisi 'MahtavaAppini' tähdellä! Katso toiminta projektissasi osoitteessa github.com/käyttäjänimi/MahtavaAppini",
    isPhishing: false,
    explanation:
      "Tämä viesti on turvallinen! ✅ Turvallisuusindikaattorit:\n" +
      "\n" +
      "• Aito verkkotunnus (github.com)\n" +
      "• Normaali ilmoitus ilman kiireellistä toimintaa\n" +
      "• Ei pyyntöjä henkilökohtaisista tiedoista\n" +
      "• Aito palveluilmoitus",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on oikeasti turvallinen! ✅ Turvallisuusindikaattorit:\n" +
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
      "Tämä viesti on turvallinen! ✅ Turvallisuusindikaattorit:\n" +
      "\n" +
      "• Koulun verkkotunnus (.fi)\n" +
      "• Personoitu nimellä\n" +
      "• Normaali kouluviestintä\n" +
      "• Ei epäilyttäviä pyyntöjä",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on oikeasti turvallinen! ✅ Turvallisuusindikaattorit:\n" +
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
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Epäilyttävä verkkotunnus (ei virallinen yritys)\n" +
      "��� Pyytää henkilötunnusta ja pankkitietoja\n" +
      "��� Luo pelkoa sakkoista\n" +
      "��� Yleinen 'Hyvä työntekijä' tervehdys\n" +
      "��� Verottaja ei ota yhteyttä työntekijöiden sähköposteilla",
    wrongExplanation:
      "❌ Ei aivan!\n" +
      "Tämä viesti on tietojenkalasteluyritys! 🚩 Varoitusmerkit:\n" +
      "\n" +
      "��� Epäilyttävä verkkotunnus (ei virallinen yritys)\n" +
      "��� Pyytää henkilötunnusta ja pankkitietoja\n" +
      "��� Luo pelkoa sakkoista\n" +
      "��� Yleinen 'Hyvä työntekijä' tervehdys\n" +
      "��� Verottaja ei ota yhteyttä työntekijöiden sähköposteilla"
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

    // asetetaan kokonaismäärät
    qTotalEl.textContent = messages.length;
    maxScoreEl.textContent = messages.length;


function showMessage(index) {
  const msg = messages[index];
  senderEl.textContent = msg.sender;
  subjectEl.textContent = msg.subject;
  bodyEl.innerHTML = msg.body.replace(/\n/g, "<br>");

  qIndexEl.textContent = index + 1;

  // aktivoi napit ja näyttää vastausvaihtoehdot
  btnSafe.disabled = false;
  btnPhish.disabled = false;

  answersBox.classList.remove("hidden");   // ← näytä napit
  feedbackBox.classList.add("hidden");     // ← piilota palaute

  // tyhjennetään vanhat tyylit/tekstit halutessa
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";
  feedbackBox.classList.remove("correct", "wrong");
}

function handleAnswer(isPhishingAnswer) {
  const msg = messages[currentIndex];
  const correct = isPhishingAnswer === msg.isPhishing;

  if (correct) {
    score++;
    scoreEl.textContent = score;
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

  // estä useampi vastaus
  btnSafe.disabled = true;
  btnPhish.disabled = true;

  // piilota napit, näytä palaute + seuraava-nappi
  answersBox.classList.add("hidden");
  feedbackBox.classList.remove("hidden");

  if (currentIndex >= messages.length - 1) {
    nextBtn.textContent = "VALMIS";
  } else {
    nextBtn.textContent = "Seuraava viesti →";
  }
}

function finishGame() {
  // piilota kysymyspaneeli, näytä tulosnäkymä
  quizPanel.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  // 4 / 6 oikein
  resultScoreText.textContent = `${score} / ${messages.length} oikein`;

  // kommentti tuloksen mukaan
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

  // pisteet – säädä kerroin halutuksi
  const pointsPerCorrect = 25;
  const points = score * pointsPerCorrect;
  resultPointsText.textContent = `+${points} pistettä`;
}

function restartGame() {
  // nollataan tilat
  score = 0;
  currentIndex = 0;
  scoreEl.textContent = "0";
  qIndexEl.textContent = "1";
  nextBtn.textContent = "Seuraava viesti →";

  // näytä taas kysymyspaneeli, piilota tulos
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

    // käynnistää pelin
    showMessage(currentIndex);
