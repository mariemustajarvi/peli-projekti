// Privacy Quiz Game
(function(){
  const panelBody = document.querySelector('.panel-body');

  try {
    // Quiz data
    const data = {
      ui: {
        backBtnText: '←  Takaisin missioihin',
        panelTitle: '🔒 YKSITYISYYS & KÄYTTÖOIKEUDET',
        panelSubPrefix: 'KYSYMYS',
        scoreLabel: 'PISTEET:',
        scenarioLabel: '📱 SKENAARIO:',
        nextBtn: 'SEURAAVA SKENAARIO →',
        backToIndex: 'Takaisin tehtäviin',
        restart: 'Suorita uudelleen',
        finishedHeading: 'Olet suorittanut tehtävän!'
      },
      questions: [
        {
          id: 'q1',
          scenario: 'Luot sosiaalisen median profiilia. Mitkä tiedot on turvallista jakaa julkisesti? <br><br>Mitä sinun pitäisi jakaa?</br></br>',
          options: [
            {id:'A', text:'Koko nimesi, puhelinnumerosi ja osoitteesi'},
            {id:'B', text:'Vain etunimesi ja harrastuksesi'},
            {id:'C', text:'Koulusi nimi ja tuntisuunnitelma'},
            {id:'D', text:'Syntymäpäiväsi mukaan lukien vuosi'}
          ],
          correct: 'B',
          explanation: 'Jaa vain perus- ja ei-arkaluonteisia tietoja julkisesti. Etunimesi ja harrastuksesi ovat turvallisia. Älä koskaan jaa osoitettasi, puhelinnumeroasi, koulutietojasi tai tarkkaa syntymäpäivääsi julkisesti.'
        },
        {
          id: 'q2',
          scenario: 'Uusi sovellus pyytää lupaa käyttää yhteystietojasi, sijaintiasi, kameraasi ja mikrofoniasi. <br><br>Mitä sinun pitäisi harkita?</br></br>',
          options: [
            {id:'A', text:'Myöntää vain luvat, joita sovellus todella tarvitsee'},
            {id:'B', text:'Estää kaikki'},
            {id:'C', text:'Hyväksy kaikki luvat käyttääksesi kaikkia ominaisuuksia'},
            {id:'D', text:'Sillä ei ole väliä, kaikki sovellukset tarvitsevat näitä'}
          ],
          correct: 'A',
          explanation: 'Anna sovelluksille vain ne luvat, joita ne todella tarvitsevat! Kuvankäsittelysovellus tarvitsee kameran mutta ei yhteystietojasi. Tarkista jokainen lupa ja mieti miksi sovellus tarvitsee sitä.'
        },
        {
          id: 'q3',
          scenario: 'Käytät julkista tietokonetta kirjastossa. Mitä sinun pitäisi tehdä kun olet valmis? <br><br>Paras käytäntö?</br></br>',
          options: [
            {id:'A', text:'Vain sulkea selain'},
            {id:'B', text:'Jättää kaikki auki seuraavalle henkilölle'},
            {id:'C', text:'Kirjautua ulos vain tärkeistä tileistä'},
            {id:'D', text:'Kirjautua ulos ja tyhjäntää selaushistoria'}
          ],
          correct: 'D',
          explanation: 'Kirjaudu aina kokonaan ulos ja tyhjännä selaushistoria julkisilla tietokoneilla. Tämä estää seuraavaa henkilöä pääsemästä tileillesi tai näkemästä henkilökohtaista tietojasi.'
        },
        {
          id: 'q4',
          scenario: 'Verkkosivusto käyttää evästeitä ja pyytää suostumustasi. Mitä sinun pitäisi tietää? <br><br>Mihin evästeitä käytetään?</br></br>',
          options: [
            {id:'A', text:'Ne ovat vain verkkosivustojen toimimista varten'},
            {id:'B', text:'Ne tallentavat vain salasanasi'},
            {id:'C', text:'Ne voivat seurata selaustasi ja kerätä tietoja sinusta'},
            {id:'D', text:'Ne ovat harmittomia ja aina hyödyllisiä'}
          ],
          correct: 'C',
          explanation: 'Evästeet voivat seurata verkkoaktiivisuuttasi verkkosivustoilla! Osa on tarpeen verkkosivustojen toimimiseksi mutta monet seuraavat sinua mainostarkoituksiin. Tarkista evästeasetukset ja hyväksy vain mitä olet valmis hyväksymään.'
        },
        {
          id: 'q5',
          scenario: 'Haluat käyttää ilmaista WiFi:tä kahvilassa tarkistaaksesi pankkitilisi. <br><br>Onko tämä turvallista?</br></br>',
          options: [
            {id:'A', text:'Kyllä, ilmainen WiFi on aina turvallista käyttää'},
            {id:'B', text:'Ei, vältä arkaluonteisten tietojen tarkistamista julkisissa verkoissa'},
            {id:'C', text:'Kyllä, jos kahvila näyttää luotettavalta'},
            {id:'D', text:'Kyllä mutta vain jos käytät puhelintasi'}
          ],
          correct: 'B',
          explanation: 'Julkinen WiFi EI ole turvallinen! Kuka tahansa samassa verkossa voi mahdollisesti nähdä tietosi. Älä koskaan käytä arkaluontoisia tilejä (pankki, sähköpostin salasanat) julkisessa WiFi:ssä ilman VPN:ää.'
        },
        {
          id: 'q6',
          scenario: 'Sovellus haluaa tietää sijaintisi "aina", jopa kun et käytä sovellusta. <br><br>Mitä sinun piäisi tehdä?</br></br>',
          options: [
            {id:'A', text:'Vaihtaa se "vain sovelluksen käytön aikana" tai estää'},
            {id:'B', text:'Sillä ei ole väliä'},
            {id:'C', text:'Salli se mutta sammuttaa se myöhemmin'},
            {id:'D', text:'Sallia se - ne luultavasti tarvitsevat sitä'}
          ],
          correct: 'A',
          explanation: 'Sovellukset harvoin tarvitsevat sijaintiasi "aina"! Tämä seuraa sinua jatkuvasti. Valitse "sovelluksen käytön aikana", jotta voit hallita milloin ne näkevät sijaintisi. Suojaa yksityisyyttäsi rajoittamalla seurantaa.'
        }
      ]
    };
    
    const questions = data.questions;
    const ui = data.ui;
    const totalQuestions = questions.length;

    // Setup page text
    document.querySelector('.back-btn').innerHTML = ui.backBtnText;
    document.querySelector('.panel-title').innerHTML = ui.panelTitle;
    document.querySelector('.panel-sub').innerHTML = `${ui.panelSubPrefix} <span id="qIndex">1</span> / <span id="qTotal">${totalQuestions}</span> | ${ui.scoreLabel} <span id="score">0</span> / <span id="maxScore">${totalQuestions}</span>`;
    document.querySelector('.q-label').innerHTML = ui.scenarioLabel;

    // Game state
    let currentQuestion = 0;
    let playerScore = 0;

    // Load saved progress
    try {
      const saved = JSON.parse(localStorage.getItem('tietosuoja_progress'));
      if (saved) {
        currentQuestion = saved.qIndex;
        playerScore = saved.score;
      }
    } catch(e) {}

    // Get elements
    const questionNumberEl = document.getElementById('qIndex');
    const scoreEl = document.getElementById('score');
    const scenarioEl = document.getElementById('scenario');
    const optionsEl = document.getElementById('options');
    const infoEl = document.getElementById('info');
    const infoText = document.getElementById('infoText');
    const nextBtn = document.getElementById('nextBtn');
    
    // Create screen reader announcement element
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

    // Save progress
    function saveProgress() {
      localStorage.setItem('tietosuoja_progress', JSON.stringify({
        qIndex: currentQuestion, 
        score: playerScore
      }));
    }

    // Display question
    function showQuestion() {
      const question = questions[currentQuestion];
      questionNumberEl.textContent = currentQuestion + 1;

      // Split scenario text
      const parts = question.scenario.split('<br><br>');
      scenarioEl.innerHTML = parts[0];
      document.getElementById('followup').innerHTML = parts[1] || '';

      // Clear previous options
      optionsEl.innerHTML = '';
      infoEl.className = 'info-box';
      infoEl.setAttribute('aria-hidden', 'true');
      nextBtn.disabled = true;

      // Create answer buttons
      question.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.className = 'option';
        button.dataset.optId = option.id;
        button.textContent = option.id + '. ' + option.text;
        button.setAttribute('aria-label', 'Vastausvaihtoehto ' + option.id + ': ' + option.text);
        optionsEl.appendChild(button);
        
        // Focus first option for keyboard users
        if (index === 0) {
          setTimeout(() => button.focus(), 100);
        }
      });

      // Announce question to screen readers
      announceToScreenReader('Kysymys ' + (currentQuestion + 1) + ' / ' + totalQuestions + '. ' + parts[0].replace(/<[^>]*>/g, ''));

      saveProgress();
    }

    // Quiz complete
    function finishQuiz() {
      localStorage.removeItem('tietosuoja_progress');
      document.querySelector('.panel-header').style.display = 'none';

      // Calculate points
      const maxPoints = 200;
      const earnedPoints = Math.round((playerScore / totalQuestions) * maxPoints);

      // Save points
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}

      // Get motivational message
      let message = '';
      if (playerScore === totalQuestions) {
        message = 'Täydellinen suoritus, agentti! Olet mestari yksityisyyden suojaamisessa. Ansaitsit täydet pisteet!';
      } else if (playerScore >= totalQuestions / 2) {
        message = 'Hienoa työtä, agentti! Saat lisäbuusterin — jatka näin ja kerää lisää pisteitä.';
      } else {
        message = 'Hyvä yritys, agentti! Joka virhe opettaa jotain uutta. Yritä uudelleen ja paranna taitojasi!';
      }

      // Show finish screen
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

    // Check answer
    function checkAnswer(button, isCorrect) {
      // Disable all buttons
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
        // Show correct answer
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

    // Click answer
    optionsEl.addEventListener('click', function(e) {
      const button = e.target.closest('.option');
      if (!button || button.classList.contains('disabled')) return;
      
      const isCorrect = button.dataset.optId === questions[currentQuestion].correct;
      checkAnswer(button, isCorrect);
    });

    // Keyboard shortcuts (A-D or 1-4)
    document.addEventListener('keydown', function(e) {
      const key = e.key.toUpperCase();
      
      // Press A, B, C, or D
      if (key === 'A' || key === 'B' || key === 'C' || key === 'D') {
        const allButtons = optionsEl.querySelectorAll('.option');
        allButtons.forEach(function(btn) {
          if (btn.dataset.optId === key && !btn.classList.contains('disabled')) {
            btn.click();
          }
        });
      }
      
      // Press 1, 2, 3, or 4
      if (e.key >= '1' && e.key <= '4') {
        const buttonIndex = Number(e.key) - 1;
        const button = optionsEl.children[buttonIndex];
        if (button && !button.classList.contains('disabled')) {
          button.click();
        }
      }
    });

    // Next button
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
