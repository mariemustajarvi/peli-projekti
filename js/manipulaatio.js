// Manipulaatio peli
// Note: Accessibility features loaded from accessibility.js 
(function(){
  const panelBody = document.querySelector('.panel-body');

  try {
    // kyssärit
    const data = {
      ui: {
        backBtnText: '←  Takaisin missioihin',
        panelTitle: '🎭 SOSIAALISEN MANIPULAATION SKENAARIO',
        panelSubPrefix: 'KYSYMYS',
        scoreLabel: 'PISTEET:',
        scenarioLabel: '📱 SKENAARIO:',
        nextBtn: 'SEURAAVA SKENAARIO →',
        backToIndex: 'Takaisin tehtäviin',
        restart: 'Suorita uudelleen',
        finishedHeading: 'Olet suorittanut tehtävän!'
      },
      allQuestions: [
        {
          id: 'q1',
          scenario: 'Henkilö soittaa ja väittää olevansa koulusi IT-osastolta. He sanovat, että tilisi okanssa on ongelma ja tarvitsevat salasanasi korjatakseen sen.<br><br>Mitä sinun pitäisi tehdä?',
          options: [
            {id:'A', text:'Antaa heille salasanasi, jotta he voivat korjata ongelman'},
            {id:'B', text:'Lopettaa puhelu ja ottaa yhteyttä koulusi IT-osastoon suoraan'},
            {id:'C', text:'Pyytää heitä soittamaan myöhemmin uudelleen'},
            {id:'D', text:'Antaa heille käyttäjätunnuksesi mutta ei salasana'}
          ],
          correct: 'B',
          explanation: 'Älä koskaan anna salasanasi kenellekkään, vaikka he väittäisivät olevansa IT-osastolta! Oikeat IT-osastot eivät koskaan kysy salasanoja. Vahvista aina ottamalla heihin yhteyttä suoraan virallisten kanavien kautta.'
        },
        {
          id: 'q2',
          scenario: 'Tuntematon henkilö sosiaalisessa mediassa tarjoaa sinulle ilmaisen lahjakortin, jos jaat kotiosoitteesi ja puhelinnumerosi.<br><br>Mitä sinun pitäisi tehdä?',
          options: [
            {id:'A', text:'Jättää huomiotta ja estää henkilö'},
            {id:'B', text:'Jakaa tiedot saadaksesi lahjakortin'},
            {id:'C', text:'Kysy ystävältäsi, saivatko he saman tarjouksen'},
            {id:'D', text:'Anna väärä osoite'}
          ],
          correct: 'A',
          explanation: 'Tämä on yleinen sosiaalinen manipuloinnin taktiikka! Älä koskaan jaa henkilökohtaisia tietoja tuntemattomien kanssa verkossa, erityisesti "ilmaisten" tarjousten vuoksi. Estä ja raportoi epäilyttävät tilit.'
        },
        {
          id: 'q3',
          scenario: 'Saat tekstiviestin tuntemattomasta numerosta, joka väittää olevan ystäväsi ja että hän on tällä hetkellä vaikeuksissa ja tarvitsee sinun lähettävän rahaa kiireellisesti mobilepaylla uuteen numeroon.<br><br>Mikä on paras vastaus?',
          options: [
            {id:'A', text:'Lähetä raha välittömästi MobilePaylle, koska ystävä on pulassa.'},
            {id:'B', text:'Välittää tekstiviestiä muille ystäville.'},
            {id:'C', text:'Jättää se täysin huomioitta.'},
            {id:'D', text:'Soittaa tai lähettää viesti ystävällesi suoraan vahvistaaksesi.'}
          ],
          correct: 'D',
          explanation: 'Vahvista aina kiirreelliset pyynnöt suoraan! Huijarit luovat vääriä hätätilanteita painostakseen sinut toimimaan nopeasti. Ota yhteyttä ystävääsi eri menetelmällä vahvistaksesi.'
        },
        {
          id: 'q4',
          scenario: 'Joku pelialustalla tarjoaa sinulle ilmaisen pelin sisäistä valuuttaa, jos annat heille tilin kirjautumistietosi väliaikaisesti.<br><br>Mitä sinun pitäisi tehdä?',
          options: [
            {id:'A', text:'Anna heille kirjautumistiedot, koska se on vain peli.'},
            {id:'B', text:'Vaihtaa salasanasi ensin, sitten jakaa se'},
            {id:'C', text:'Älä koskaan jaa tilisiäsi - se on huijaus.'},
            {id:'D', text:'Pyytää heitä todistamaan, että he ovat laillisia'}
          ],
          correct: 'C',
          explanation: 'Tilin jakaaminen voi johtaa tilin varastamiseen ja kaikkien tietojese menettämiseen! Oikeat pelit eivät koskaan vaadi kirjautumistietojasi. Älä koskaan jaa tilejäsi kenenkään kanssa, edes parhaan ystävän.'
        },
        {
          id: 'q5',
          scenario: 'Saat puhelun, jossa ääni kuulostaa täsmälleen ystävältäsi. Hän sanoo: "tarvitsen tunnuksei yhteen kouluprojektiin, voitko sanoa sen nopeasti"<br><br>Mitä sinun pitäisi tehdä?',
          options: [
            {id:'A', text:'Antaa tunnukset, koska ääni kuulostaa kaveriltasi'},
            {id:'B', text:'Katkaista puhelu ja varmistaa asia ystävältä toisessa kanavassa'},
            {id:'C', text:'Pyytää häntä lähettämään viestin oikeasta numerostaan'},
            {id:'D', text:'Kysyä, mihin projektiin hän niitä tarvitsee'}
          ],
          correct: 'B',
          explanation: 'Deepfake-äänet ovat yleistyneet. Ääni ei ole todiste - tärkeintä on varmistaa asia toisesta kanavasta kuten WhatsAppista tai kasvotusten.'
        },
        {
          id: 'q6',
          scenario: 'Opettaja lähettää Teamsissa linkin videokutsuun: "Liity tähän uuteen etätuntihuoneeseen". Linkin domain näyttää tältä: teams-school-verify.net<br><br>Mitä tekisit?',
          options: [
            {id:'A', text:'Klikkaat ja liityt tapaamiseen'},
            {id:'B', text:'Varmistat linkin luokkakaverilta'},
            {id:'C', text:'Tarkistat opettajalta tai Wilmasta onko kyse oikeasta linkista'},
            {id:'D', text:'Kopioi linkin selaimeen ja toivot parasta'}
          ],
          correct: 'C',
          explanation: 'Väärennetyt Teams/Google Meet -linkit keräävät tunnuksia. Aito Teams-linkki päättyy microsoft.com tai teams.microsoft.com. Jos linkki näyttää erilaiselta --> se on vaarallinen.'
        },
        {
          id: 'q7',
          scenario: 'Saat TikTokissa kommentin: "Hei! Olet voittanut iPhone 15 - arvonnassa! Vastaa DM:llä niin lähetän paketin! ⭐🎁"<br><br>Miten sinun tulisi toimia?',
          options: [
            {id:'A', text:'Lähetä DM:ssä omat yhteystiedot voiton lunastamiseksi'},
            {id:'B', text:'Klikkaa profiilia ja tarkista arvonnan'},
            {id:'C', text:'Poista kommentti ja estä käyttäjän'},
            {id:'D', text:'Kysyä, mitä tietoja he tarvitsevat'}
          ],
          correct: 'C',
          explanation: 'TikTok-arvontahuijaukset ovat yleisiä. Jos et ole osallistunut arvontaan, et voi voittaa sitä. Estä ja raportoi, älä koskaan anna osoitetta tai puhelinnumeroa tuntemattomille.'
        },
        {
          id: 'q8',
          scenario: 'Kaveri lähettää sinulle Instagramissa linkin ja sanoo: "Voitko auttaa? Mun IG on bugannut, kirjaudu sisään tästä ja testaa"<br><br>Mikä on paras vaihtoehto?',
          options: [
            {id:'A', text:'Kirjautua sisään, koska haluat auttaa.'},
            {id:'B', text:'Klikata linkkiä, mutta olla kirjautumatta.'},
            {id:'C', text:'Kysyä kaverilta esim. WhatsAppissa/Snapchatissa, lähettikö hän viestin.'},
            {id:'D', text:'Jättää huomiotta koska tiedät, että se on huijaus.'}
          ],
          correct: 'C',
          explanation: 'IG-tilien kaappaukset tapahtuvat usein kavereiden kautta. Jos viesti tuntuu oudolta --> tili on näköisesti varastettu. Varmistus toisesta sovelluksesta pelastaa molempien tilit.'
        }
      ]
    };
    
    const ui = data.ui;
    const allQuestions = data.allQuestions;
    
    // Randomize and select 5 questions
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    const questions = shuffleArray(allQuestions).slice(0, 5);
    const totalQuestions = questions.length;

    // Setup page text
    document.querySelector('.back-btn').innerHTML = ui.backBtnText;
    document.querySelector('.panel-title').innerHTML = ui.panelTitle;
    document.querySelector('.panel-sub').innerHTML = `${ui.panelSubPrefix} <span id="qIndex">1</span> / <span id="qTotal">${totalQuestions}</span> | ${ui.scoreLabel} <span id="score">0</span> / <span id="maxScore">${totalQuestions}</span>`;
    document.querySelector('.q-label').innerHTML = ui.scenarioLabel;

    // tilanne tsekkaus
    let currentQuestion = 0;
    let playerScore = 0;

    // Load saved progress
    try {
      const saved = JSON.parse(localStorage.getItem('manipulaatio_progress'));
      if (saved) {
        currentQuestion = saved.qIndex;
        playerScore = saved.score;
      }
    } catch(e) {}

    // elementit
    const questionNumberEl = document.getElementById('qIndex');
    const scoreEl = document.getElementById('score');
    const scenarioEl = document.getElementById('scenario');
    const optionsEl = document.getElementById('options');
    const infoEl = document.getElementById('info');
    const infoText = document.getElementById('infoText');
    const nextBtn = document.getElementById('nextBtn');
    
    // screen readeri ilmoitukset
    const srAnnouncer = document.createElement('div');
    srAnnouncer.setAttribute('role', 'status');
    srAnnouncer.setAttribute('aria-live', 'polite');
    srAnnouncer.setAttribute('aria-atomic', 'true');
    srAnnouncer.className = 'sr-only';
    document.body.appendChild(srAnnouncer);
    
    function announceToScreenReader(message) {
      srAnnouncer.textContent = '';
      setTimeout(() => {
        srAnnouncer.textContent = message;
      }, 100);
    }

    // tallenna edistyminen
    function saveProgress() {
      localStorage.setItem('manipulaatio_progress', JSON.stringify({
        qIndex: currentQuestion, 
        score: playerScore
      }));
    }

    // näytä kyssäri
    function showQuestion() {
      const question = questions[currentQuestion];
      questionNumberEl.textContent = currentQuestion + 1;

      
      const parts = question.scenario.split('<br><br>');
      scenarioEl.innerHTML = parts[0];
      document.getElementById('followup').innerHTML = parts[1] || '';

      
      optionsEl.innerHTML = '';
      infoEl.className = 'info-box';
      infoEl.setAttribute('aria-hidden', 'true');
      nextBtn.disabled = true;

      // vastausnapit
      question.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.className = 'option';
        button.dataset.optId = option.id;
        button.textContent = option.id + '. ' + option.text;
        button.setAttribute('aria-label', 'Vastausvaihtoehto ' + option.id + ': ' + option.text);
        optionsEl.appendChild(button);
        
        // set up näppäimistö käyttäjäjille
        if (index === 0) {
          setTimeout(() => button.focus(), 100);
        }
      });

      // kyssäri ruudunlukijalle
      announceToScreenReader('Kysymys ' + (currentQuestion + 1) + ' / ' + totalQuestions + '. ' + parts[0].replace(/<[^>]*>/g, ''));

      saveProgress();
    }

    // valmis
    function finishQuiz() {
      localStorage.removeItem('manipulaatio_progress');
      document.querySelector('.panel-header').style.display = 'none';

      // laske pisteet
      const maxPoints = 150;
      const earnedPoints = Math.round((playerScore / totalQuestions) * maxPoints);

      // Tallenna pisteet
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}

      // motivaatio tekstit
      let message = '';
      if (playerScore === totalQuestions) {
        message = 'Täydellinen suoritus, agentti! Olet mestari manipulaation tunnistamisessa. Et tehnyt yhtäkään virhettä - juuri kuten huippuagentin kuuluukin!';
      } else if (playerScore >= totalQuestions / 2) {
        message = 'Hienoa työtä, agentti! Olet oikealla polulla - hio tarkuuttasi, niin murtaudut huipulle!';
      } else {
        message = 'Hyvä yritys, agentti! Joka virhe opettaa jotain uutta. Sinussa on enemmän potentiaalia kuin tulos näyttää!';
      }

      // näytä feedback screeni
      panelBody.innerHTML = 
        '<div class="completion-screen">' +
        '<div class="completion-trophy">🏆</div>' +
        '<h2 class="completion-title">' + ui.finishedHeading + '</h2>' +
        '<div class="completion-card">' +
        '<div class="completion-emoji">👍</div>' +
        '<p class="completion-score">' + playerScore + ' / ' + totalQuestions + ' oikein</p>' +
        '<p class="completion-message">' + message + '</p>' +
        '<hr class="completion-divider">' +
        '<div class="completion-points-wrapper">' +
        '<span class="completion-points">+' + earnedPoints + ' pistettä</span>' +
        '</div>' +
        '</div>' +
        '<div class="completion-buttons">' +
        '<a href="index.html" class="next-btn completion-btn">' + ui.backToIndex + '</a>' +
        '<button id="restartBtn" class="next-btn completion-btn">' + ui.restart + '</button>' +
        '</div>' +
        '</div>';

      document.getElementById('restartBtn').addEventListener('click', function() {
        location.reload();
      });
    }

    // Tarkista vastaus
    function checkAnswer(button, isCorrect) {
      const allButtons = optionsEl.querySelectorAll('.option');
      allButtons.forEach(function(btn) {
        btn.classList.add('disabled');
        btn.setAttribute('aria-disabled', 'true');
      });
      
      if (isCorrect) {
        button.classList.add('selected-correct');
        button.setAttribute('aria-label', button.getAttribute('aria-label') + ' - Oikein!');
        playerScore++;
        infoEl.classList.add('info-success');
        infoText.textContent = questions[currentQuestion].explanation;
        announceToScreenReader('Oikein! ' + questions[currentQuestion].explanation + ' Pisteet: ' + playerScore + ' / ' + totalQuestions);
      } else {
        button.classList.add('selected-wrong');
        button.setAttribute('aria-label', button.getAttribute('aria-label') + ' - Väärin');
        // Näytä oikea vastaus
        const correctAnswer = questions[currentQuestion].correct;
        allButtons.forEach(function(btn) {
          if (btn.dataset.optId === correctAnswer) {
            btn.classList.add('correct');
            btn.setAttribute('aria-label', btn.getAttribute('aria-label') + ' - Oikea vastaus');
          }
        });
        infoEl.classList.add('info-warn');
        infoText.textContent = '💡 ' + questions[currentQuestion].explanation;
        announceToScreenReader('Väärin. Oikea vastaus oli ' + correctAnswer + '. ' + questions[currentQuestion].explanation);
      }
      
      infoEl.setAttribute('aria-hidden', 'false');
      scoreEl.textContent = playerScore;
      nextBtn.disabled = false;
      nextBtn.focus();
      saveProgress();
    }

    // Klikkaa vastausta
    optionsEl.addEventListener('click', function(e) {
      const button = e.target.closest('.option');
      if (!button || button.classList.contains('disabled')) return;
      
      const isCorrect = button.dataset.optId === questions[currentQuestion].correct;
      checkAnswer(button, isCorrect);
    });

    // Näppäimistön pikanäppäimet (A-D tai 1-4)
    document.addEventListener('keydown', function(e) {
      const key = e.key.toUpperCase();
      
      // Paina A, B, C tai D
      if (key === 'A' || key === 'B' || key === 'C' || key === 'D') {
        const allButtons = optionsEl.querySelectorAll('.option');
        allButtons.forEach(function(btn) {
          if (btn.dataset.optId === key && !btn.classList.contains('disabled')) {
            btn.click();
          }
        });
      }
      
      // Paina 1, 2, 3 tai 4
      if (e.key >= '1' && e.key <= '4') {
        const buttonIndex = Number(e.key) - 1;
        const button = optionsEl.children[buttonIndex];
        if (button && !button.classList.contains('disabled')) {
          button.click();
        }
      }
    });

    // Seuraava nappi
    nextBtn.addEventListener('click', function() {
      currentQuestion++;
      if (currentQuestion >= totalQuestions) {
        finishQuiz();
      } else {
        showQuestion();
      }
    });

    // Setup
    nextBtn.textContent = ui.nextBtn;
    showQuestion();

  } catch(err) {
    console.error(err);
  }
})();
