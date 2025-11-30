    const messages = [
      {
        sender: "turvallisuus@amaz0n-tuki.com",
        subject: "KIIREELLINEN: Tilisi suljetaan!",
        body: "Hyvä asiakas, Havaitsimme epäilyttävää toimintaa tililläsi. Klikkaa tästä välittömästi vahvistaaksesi henkilöllisyytesi tai tilisi suljetaan pysyvästi 24 tunnin kuluessa!",
        isPhishing: true,
        explanation:
          "Hienoa työtä! 🎉\n"+
          "Tämä viesti on tietojenkalasteluyritys!\n" +
          "Varoitusmerkit:\n" +
          "• Lähettäjän osoite on epäilyttävä (kirjoitusvirhe 'amaz0n').\n" +
          "• Viesti luo kiireen tunteen ja uhkaa tilin sulkemisella.\n" +
          "• Sinua painostetaan klikkaamaan linkkiä vahvistaaksesi tietosi."
      },
      {
        sender: "ilmoitukset@pankki.fi",
        subject: "Kuukausittainen tiliote saatavilla",
        body: "Hei,\n\nUusin tiliotteesi on nyt saatavilla verkkopankissa. " +
              "Kirjaudu itse normaalisti pankin verkkosivuilla tarkistaaksesi sen.\n\nTerveisin,\nPankkisi",
        isPhishing: false,
        explanation:
          "Tämä viesti vaikuttaa turvalliselta, koska:\n" +
          "• Lähettäjän osoite näyttää oikealta pankin osoitteelta.\n" +
          "• Viestissä ei ole kiireuhkauksia tai vaatimusta klikata epäilyttävää linkkiä.\n" +
          "• Sinua ohjataan kirjautumaan itse pankin sivuille, ei viestin linkin kautta."
      },
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

    // asetetaan kokonaismäärät
    qTotalEl.textContent = messages.length;
    maxScoreEl.textContent = messages.length;

    // ----- FUNKTIOT -----
    function showMessage(index) {
      const msg = messages[index];
      senderEl.textContent = msg.sender;
      subjectEl.textContent = msg.subject;
      bodyEl.innerHTML = msg.body.replace(/\n/g, "<br>");

      qIndexEl.textContent = index + 1;

      // aktiivisena olevat napit ja piilota palaute
      btnSafe.disabled = false;
      btnPhish.disabled = false;
      feedbackBox.classList.add("hidden");
    }

    function handleAnswer(isPhishingAnswer) {
      const msg = messages[currentIndex];
      const correct = isPhishingAnswer === msg.isPhishing;

    if (correct) {
      score++;
      scoreEl.textContent = score;
      feedbackTitle.textContent = "Oikein!";
      feedbackBox.classList.remove("wrong");
      feedbackBox.classList.add("correct");
    } else {
      feedbackTitle.textContent = "Väärin.";
      feedbackBox.classList.remove("correct");
      feedbackBox.classList.add("wrong");
    }

    feedbackText.innerHTML = msg.explanation.replace(/\n/g, "<br>");

      // estetään useampi vastaus samaan viestiin
      btnSafe.disabled = true;
      btnPhish.disabled = true;

      feedbackBox.classList.remove("hidden");

      // piilota seuraava-nappi jos ollaan viimeisessä kysymyksessä
      if (currentIndex >= messages.length - 1) {
        nextBtn.textContent = "Peli ohi";
      } else {
        nextBtn.textContent = "Seuraava viesti →";
      }
    }

    function nextMessage() {
      if (currentIndex >= messages.length - 1) {
        // tehdäänkö loppuun joku pop-up?
        alert("Peli ohi! Sait " + score + " / " + messages.length + " oikein.");
        return;
      }
      currentIndex++;
      showMessage(currentIndex);
    }

    // ----- EVENT LISTENERS -----
    btnSafe.addEventListener("click", () => handleAnswer(false));
    btnPhish.addEventListener("click", () => handleAnswer(true));
    nextBtn.addEventListener("click", nextMessage);

    // käynnistää pelin
    showMessage(currentIndex);
