// Quiz peli javascript v1.0

// korkea kontrasti toggle
(function() {
  const contrastToggle = document.getElementById('contrastToggle');
  const body = document.body;

  // Lataa tallennettu asetus
  const savedContrast = localStorage.getItem('high_contrast_mode');
  if (savedContrast === 'true') {
    body.classList.add('high-contrast');
    contrastToggle.setAttribute('aria-label', 'Vaihda takaisin normaaliin tilaan');
    contrastToggle.setAttribute('title', 'Vaihda takaisin normaaliin tilaan');
  }

  contrastToggle.addEventListener('click', function() {
    body.classList.toggle('high-contrast');
    const isHighContrast = body.classList.contains('high-contrast');

    // Tallenna asetus
    localStorage.setItem('high_contrast_mode', isHighContrast);

    // napin labelit
    if (isHighContrast) {
      contrastToggle.setAttribute('aria-label', 'Vaihda takaisin normaaliin tilaan');
      contrastToggle.setAttribute('title', 'Vaihda takaisin normaaliin tilaan');
    } else {
      contrastToggle.setAttribute('aria-label', 'Vaihda korkean kontrastin tilaan');
      contrastToggle.setAttribute('title', 'Vaihda korkean kontrastin tilaan');
    }
  });
})();

(function(){
  const panelBody = document.querySelector('.panel-body');

  try {
    // Quiz peli data
    const data = {
      ui: {
        backBtnText: '←  Takaisin missioihin',
        panelTitle: '🏆 LOPULLINEN ARVIOINTI: KYBERTURVA',
        panelSubPrefix: 'Analyysi',
        scoreLabel: 'Oikein:',
        nextBtn: 'SEURAAVA KYSYMYS →',
        backToIndex: 'Takaisin tehtäviin',
        restart: 'Suorita uudelleen',
        finishedHeading: 'Olet suorittanut tehtävän!'
      },
      questions: [
        {
          id: 'q1',
          question: 'Mikä tekee salasanasta vahvan?',
          options: [
            {id:'A', text:'Syntymäpäiväsi'},
            {id:'B', text:'Lemmikkisi nimi'},
            {id:'C', text:'Vähintään 12 merkkiä kirjaimia, numeroita ja symboleja'},
            {id:'D', text:'Sana "salasana"'}
          ],
          correct: 'C',
          explanation: 'Vahva salasana sisältää vähintään 12 merkkiä, sekoituksen isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä. Vältä helposti arvattavia tietoja kuten syntymäpäiviä tai lemmikkien nimiä.'
        },
        {
          id: 'q2',
          question: 'Mitä tarkoittaa VPN?',
          options: [
            {id:'A', text:'Virtual Private Network'},
            {id:'B', text:'Very Personal Notes'},
            {id:'C', text:'Verified Public Network'},
            {id:'D', text:'Visual Protection Node'}
          ],
          correct: 'A',
          explanation: 'VPN tarkoittaa Virtual Private Network. Se luo salatun yhteyden internetissä, suojaten tietojasi ja yksityisyyttäsi erityisesti julkisissa verkoissa.'
        },
        {
          id: 'q3',
          question: 'Mikä on tietojenkalastelu (phishing)?',
          options: [
            {id:'A', text:'Laillinen tapa hankkia tietoja'},
            {id:'B', text:'Yritys huijata sinua luovuttamaan henkilö- tai kirjautumistietoja'},
            {id:'C', text:'Pelin sisäinen tapahtuma, jossa kalastetaan virtuaalisia kaloja'},
            {id:'D', text:'Tietokoneen automaattinen virustarkistus'}
          ],
          correct: 'B',
          explanation: 'Tietojenkalastelu on huijausyritys, jossa hyökkääjä yrittää saada sinut luovuttamaan henkilökohtaisia tai kirjautumistietoja, usein naamioitumalla luotettavaksi tahoksi sähköpostin, viestien tai väärennettyjen verkkosivustojen kautta.'
        },
        {
          id: 'q4',
          question: 'Kuinka usein sinun tulisi päivittää ohjelmistosi?',
          options: [
            {id:'A', text:'Kerran vuodessa'},
            {id:'B', text:'Vain jos tietokonen on hidas'},
            {id:'C', text:'Ei koskaan, ne rikkovat asioita'},
            {id:'D', text:'Kun päivitykset tulevat saataville'}
          ],
          correct: 'D',
          explanation: 'Päivitä ohjelmistot aina kun päivitykset tulevat saataville! Päivitykset sisältävät tärkeitä tietoturvapäivityksiä jotka suojaavat sinua uusilta uhilta ja haavoittuvuuksilta.'
        },
        {
          id: 'q5',
          question: 'Mitä sinun pitöisi tehdä, jos klikkasit vahingossa epäilyttävää linkkiä?',
          options: [
            {id:'A', text:'Sulkea sivu välittömästi, suoritaa virustarkistus ja vaihda salasanat'},
            {id:'B', text:'Huolehtia vain jos jokin näyttää oudolta'},
            {id:'C', text:'Ei mitään, jatkaa normaalisti'},
            {id:'D', text:'Ilmoittaa ystäville, että linkki on hauska'}
          ],
          correct: 'A',
          explanation: 'Jos klikkaat epäilyttävää linkkiä, sulje sivu välittömästi. Suorita täydellinen virustarkistus laitteellasi ja vaihda salasanasi erityisesti, jos syötit tietoja kyseisellä sivulla.'
        },
        {
          id: 'q6',
          question: 'Mitä kaksivaiheeinen tunnistautuminen (2FA) tekee?',
          options: [
            {id:'A', text:'Lisää ylimääräisen suojakerroksen tilillesi'},
            {id:'B', text:'Tekee kirjautumisesta hitaampaa'},
            {id:'C', text:'Se ei ole tarpeellinen'},
            {id:'D', text:'Se vain lähettää sinulle sähköposteja'}
          ],
          correct: 'A',
          explanation: 'Kaksivaiheeinen tunnistautuminen (2FA) lisää ylimääräisen suojakerroksen vaatimalla kaksi todistusta henkilöllisyydestäsi - yleensä salasanan ja koodin puhelimeesi. Tämä tekee tilisi paljon turvallisemmaksi.'
        },
        {
          id: 'q7',
          question: 'Mitä sinun tulisi tehdä jos epäilet tietomurtoa?',
          options: [
            {id:'A', text:'Odottaa ja katsoa mitä tapahtuu'},
            {id:'B', text:'Vaihtaa salasanat välittömästi ja ilmoittaa asiasta'},
            {id:'C', text:'Poistaa kaikki tiedostot'},
            {id:'D', text:'Jatkaa normaalisti'}
          ],
          correct: 'B',
          explanation: 'Jos epäilet tietomurtoa, toimi nopeasti! Vaihda salasanasi välittömästi, tarkista tilin aktiviteetti ja ilmoita asiasta palveluntarjoajalle. Nopea toiminta voi estää lisävahinkoja.'
        },
        {
          id: 'q8',
          question: 'Mitä HTTPS verkkosivuston URL-osoitteessa tarkoittaa?',
          options: [
            {id:'A', text:'Verkkosivusto on nopea'},
            {id:'B', text:'Verkkosivusto on ilmainen'},
            {id:'C', text:'Verkkosivusto on suosittu'},
            {id:'D', text:'Verkkosivusto on turvallinen ja salattu'}
          ],
          correct: 'D',
          explanation: 'HTTPS tarkoittaa, että verkkosivuston ja selaimesi välinen yhteys on salattu. Tämä suojaa tietojasi siirron aikana, mutta ei takaa että sivusto itsessään on luotettava - tarkista aina verkkosivuston aitous.'
        },
        {
          id: 'q9',
          question: 'Mitä kiristysohjelmisto (ransomware) on',
          options: [
            {id:'A', text:'Ohjelmisto joka parantaa tietokoneen suorituskykyä'},
            {id:'B', text:'Eräänläinen virustorjuntaohjelma'},
            {id:'C', text:'Haittaohjelma, joka lukitsee tiedostosi ja vaatii lunnaita niiden palauttamiseksi'},
            {id:'D', text:'Videopilin latausohjelma'}
          ],
          correct: 'C',
          explanation: 'Kiristysohjelmisto on haittaohjelma, joka lukitsee tietokoneesi tiedostot tai järjestelmän ja vaatii lunnaita niiden palauttamiseksi. On tärkeää pitää varmuuskopiot tiedoistasi ja välttää epäilyttäviä linkkejä tai liitteitä.'
        },
        {
          id: 'q10',
          question: 'Mikä sovelluksen käyttöoikeus on epäilyttävä taskulamppusovellukselle?',
          options: [
            {id:'A', text:'Pääsy yhteystietoihisi ja viesteihisi'},
            {id:'B', text:'Ei mikään - kaikki ovat normaaleja'},
            {id:'C', text:'Kameran käyttöoikeus'},
            {id:'D', text:'Taskulamppu/soihtu'}
          ],
          correct: 'A',
          explanation: 'Taskulamppusovelluksen ei pitäisi tarvita pääsyä yhteystietoihisi tai viesteihisi. Tällaiset käyttöoikeudet voivat viitata siihen, että sovellus yrittää kerätä henkilökohtaisia tietojasi ilman hyvää syytä.'
        }
      ]
    };
    
    const questions = data.questions;
    const ui = data.ui;
    const totalQuestions = questions.length;

    // Setup page text
    document.querySelector('.back-btn').innerHTML = ui.backBtnText;
    document.querySelector('.panel-title').innerHTML = ui.panelTitle;
    document.querySelector('.panel-sub').innerHTML = `${ui.panelSubPrefix} <span id="qIndex">1</span> / <span id="qTotal">${totalQuestions}</span> | ${ui.scoreLabel} <span id="score">0</span> / <span id="maxScore">0</span>`;

    // tilanne tsekkaus
    let currentQuestion = 0;
    let playerScore = 0;

    // Load saved progress
    try {
      const saved = JSON.parse(localStorage.getItem('quiz_progress'));
      if (saved) {
        currentQuestion = saved.qIndex;
        playerScore = saved.score;
      }
    } catch(e) {}

    // elementit
    const questionNumberEl = document.getElementById('qIndex');
    const scoreEl = document.getElementById('score');
    const maxScoreEl = document.getElementById('maxScore');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const infoEl = document.getElementById('info');
    const infoText = document.getElementById('infoText');
    const nextBtn = document.getElementById('nextBtn');

    // tallenna edistyminen
    function saveProgress() {
      localStorage.setItem('quiz_progress', JSON.stringify({
        qIndex: currentQuestion, 
        score: playerScore
      }));
    }

    // näytä kyssäri
    function showQuestion() {
      const question = questions[currentQuestion];
      questionNumberEl.textContent = currentQuestion + 1;
      maxScoreEl.textContent = currentQuestion;

      questionEl.textContent = question.question;

      optionsEl.innerHTML = '';
      infoEl.className = 'info-box';
      infoEl.setAttribute('aria-hidden', 'true');
      nextBtn.disabled = true;

      // vastausnapit
      question.options.forEach(function(option) {
        const button = document.createElement('button');
        button.className = 'option';
        button.dataset.optId = option.id;
        button.textContent = option.id + '. ' + option.text;
        optionsEl.appendChild(button);
      });

      saveProgress();
    }

    // valmis
    function finishQuiz() {
      localStorage.removeItem('quiz_progress');
      document.querySelector('.panel-header').style.display = 'none';

      // laske pisteet
      const maxPoints = 300;
      const earnedPoints = Math.round((playerScore / totalQuestions) * maxPoints);

      // Tallenna pisteet
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}

      // motivaatio tekstit
      let message = '';
      if (playerScore === totalQuestions) {
        message = 'Täydellinen suoritus, agentti! Olet kyberturvallisuuden mestari. Olet läpäissyt kaikki testit erinomaisesti!';
      } else if (playerScore >= totalQuestions / 2) {
        message = 'Hyvä työ, agentti! Olet osoittanut vahvaa osaamista kyberturvallisuudessa. Jatka harjoittelua!';
      } else {
        message = 'Hyvä yritys, agentti! Kyberturvallisuus vaatii jatkuvaa oppimista. Palaa takaisin ja vahvista taitojasi!';
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
      });
      
      if (isCorrect) {
        button.classList.add('selected-correct');
        playerScore++;
        infoEl.classList.add('info-success');
        infoText.textContent = questions[currentQuestion].explanation;
      } else {
        button.classList.add('selected-wrong');
        // Näytä oikea vastaus
        const correctAnswer = questions[currentQuestion].correct;
        allButtons.forEach(function(btn) {
          if (btn.dataset.optId === correctAnswer) {
            btn.classList.add('correct');
          }
        });
        infoEl.classList.add('info-warn');
        infoText.textContent = '💡 ' + questions[currentQuestion].explanation;
      }
      
      infoEl.setAttribute('aria-hidden', 'false');
      scoreEl.textContent = playerScore;
      maxScoreEl.textContent = currentQuestion + 1;
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

      // Enter tai Space seuraavaan kysymykseen
      if ((e.key === 'Enter' || e.key === ' ') && !nextBtn.disabled) {
        e.preventDefault();
        nextBtn.click();
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
