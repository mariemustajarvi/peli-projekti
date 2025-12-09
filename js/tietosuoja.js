// tietosuoja quiz
(function(){
  const panelBody = document.querySelector('.panel-body');

  try {
    // kyssärit
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
      allQuestions: [
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
          scenario: 'Sovellus haluaa tietää sijaintisi "aina", jopa kun et käytä sovellusta. <br><br>Mitä sinun pitäisi tehdä?</br></br>',
          options: [
            {id:'A', text:'Vaihtaa se "vain sovelluksen käytön aikana" tai estää'},
            {id:'B', text:'Sillä ei ole väliä'},
            {id:'C', text:'Salli se mutta sammuttaa se myöhemmin'},
            {id:'D', text:'Sallia se - ne luultavasti tarvitsevat sitä'}
          ],
          correct: 'A',
          explanation: 'Sovellukset harvoin tarvitsevat sijaintiasi "aina"! Tämä seuraa sinua jatkuvasti. Valitse "sovelluksen käytön aikana", jotta voit hallita milloin ne näkevät sijaintisi. Suojaa yksityisyyttäsi rajoittamalla seurantaa.'
        },
        {
          id: 'q7',
          scenario: 'Etsit uutta peliä, Googlesta löytyy useita sivustoja, jotka tarjoavat pelin "ilmaisena". Yhdellä sivustolla on iso "DOWNLOAD NOW" -nappi ja paljon vilkkuvia mainoksia. <br><br>Mistä peli kannattaa ladata?</br></br>',
          options: [
            {id:'A', text:'Sivustolta, jossa on iso "DOWNLOAD NOW" -painike'},
            {id:'B', text:'Sattumanvaraiselta sivulta, joka tarjoaa pelin ilmaiseksi'},
            {id:'C', text:'Pelin viralliselta kotisivulta tai tunnetuilta kauppapaikoilta (Steam, Epic Games)'},
            {id:'D', text:'Torrent sivustolta - koska muutkin käyttävät'}
          ],
          correct: 'C',
          explanation: 'Lataa pelit vain virallisilta sivuilta kuten Steam, Epic Games, Origin tai pelin oikealta kotisivulta. Sivut, jotka tarjoavat "ilmaisia" latauksia tulevat usein mukana haittaohjelmia.'
        },
        {
          id: 'q8',
          scenario: 'TikTokissa leviää trendi, jossa käyttäjät kertovat "10 faktaa itsestään" - monet paljastavat lempivärin lisäksi syntymäpäivän, lemmikin nimen ja vanhempien etunimet. <br><br>Mitä sinun pitäisi tehdä?</br></br>',
          options: [
            {id:'A', text:'Jakaa samat tiedot koska kaikki muutkin tekevät niin'},
            {id:'B', text:'Jättää henkilökohtaiset tiedot kertomatta ja jakaa vain harmittomia faktoja'},
            {id:'C', text:'Antaa vääriä tietoja varmuuden vuoksi'},
            {id:'D', text:'Jakaa syntymäpäiväsi mutta ei muuta'}
          ],
          correct: 'B',
          explanation: 'Moni somehaaste kerää tietoja, joita käytetään turvakysymyksissä: lemmikin nimi, syntymäpäivä, vanhempien nimet jne. Jaa vain harmittomia faktoja - älä mitään, mitä voisi käyttää salasanojen tai tilien palautukseen.'
        },
        {
          id: 'q9',
          scenario: 'Uusi peli tarjoaa mahdollisuuden "kirjautua sisään Instagram-tililläsi", jotta voit jakaa saavutuksia. <br><br>Onko tämä turvallista?</br></br>',
          options: [
            {id:'A', text:'Kyllä koska kaikki sovellukset ovat luotettavia'},
            {id:'B', text:'Kyllä jos peli on virallinen ja tunnettu'},
            {id:'C', text:'Ei, käytä mieluummin sähköpostia tai anonyymiä kirjautumistapaa'},
            {id:'D', text:'Ei, mutta vain jos peli pyytää myös puhelinnumeroasi'}
          ],
          correct: 'C',
          explanation: 'Tilien yhdistäminen lisää riskiä: jos peli hakkeroidaan myös oma some-tilisi on vaarassa. Käytä aina erillistä kirjautumista - älä yhdistä sosiaalisen median tilejä satunnaisiin sovelluksiin.'
        },
        {
          id: 'q10',
          scenario: 'Saat Instagramissa viestin tuntemattomalta tililtä: "Haluaisin oppia tuntemaan sinut, mikä on osoitteesi? Voidaan tavata!" <br><br>Mitä sinun pitäisi tehdä?</br></br>',
          options: [
            {id:'A', text:'Antaa osoitteesi mutta vain postinumeron tarkkuudella'},
            {id:'B', text:'Vastata ja kysyä ensin, kuka hän on'},
            {id:'C', text:'Antaa vain kaupungin nimen - se ei voi olla vaarallista'},
            {id:'D', text:'Jättää vastaamatta ja estää tilin'}
          ],
          correct: 'D',
          explanation: 'Älä koskaan jaa osoitetta, kaupunkia, kouluasi tai muita henkilötietoja tuntemattomille! Estä ja raportoi epäilyttävä tili heti - tämä on yleinen lähestymistaktiikka huijareilla.'
        }
      ]
    };
    
    const ui = data.ui;
    const allQuestions = data.allQuestions;
    
    // satunnaista kyssärit mutta aina 6 kpl
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    const questions = shuffleArray(allQuestions).slice(0, 6);
    const totalQuestions = questions.length;

    // Aseta sivun tekstit
    document.querySelector('.back-btn').innerHTML = ui.backBtnText;
    document.querySelector('.panel-title').innerHTML = ui.panelTitle;
    document.querySelector('.panel-sub').innerHTML = `${ui.panelSubPrefix} <span id="qIndex">1</span> / <span id="qTotal">${totalQuestions}</span> | ${ui.scoreLabel} <span id="score">0</span> / <span id="maxScore">${totalQuestions}</span>`;
    document.querySelector('.q-label').innerHTML = ui.scenarioLabel;

    // Pelin tila
    let currentQuestion = 0;
    let playerScore = 0;

    // Lataa tallennettu edistys
    try {
      const saved = JSON.parse(localStorage.getItem('tietosuoja_progress'));
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
    
    // Luo ruudunlukijan ilmoituselementti
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

    // tallennus
    function saveProgress() {
      localStorage.setItem('tietosuoja_progress', JSON.stringify({
        qIndex: currentQuestion, 
        score: playerScore
      }));
    }

    // Näytä kyssäri
    function showQuestion() {
      const question = questions[currentQuestion];
      questionNumberEl.textContent = currentQuestion + 1;

      // Jaa skenaarion teksti
      const parts = question.scenario.split('<br><br>');
      scenarioEl.innerHTML = parts[0];
      document.getElementById('followup').innerHTML = parts[1] || '';

      // Tyhjennä aiemmat vaihtoehdot
      optionsEl.innerHTML = '';
      infoEl.className = 'info-box';
      infoEl.setAttribute('aria-hidden', 'true');
      nextBtn.disabled = true;

      // vastaus buttonit
      question.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.className = 'option';
        button.dataset.optId = option.id;
        button.textContent = option.id + '. ' + option.text;
        button.setAttribute('aria-label', 'Vastausvaihtoehto ' + option.id + ': ' + option.text);
        optionsEl.appendChild(button);
        
        // optionit näppäimistö käyttäjille
        if (index === 0) {
          setTimeout(() => button.focus(), 100);
        }
      });

      // näytä kysymys ruudunlukijoille
      announceToScreenReader('Kysymys ' + (currentQuestion + 1) + ' / ' + totalQuestions + '. ' + parts[0].replace(/<[^>]*>/g, ''));

      saveProgress();
    }

    // peli valmis
    function finishQuiz() {
      localStorage.removeItem('tietosuoja_progress');
      document.querySelector('.panel-header').style.display = 'none';

      // laske pojut
      const maxPoints = 200;
      const earnedPoints = Math.round((playerScore / totalQuestions) * maxPoints);

      // tallenna pojut
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}

      // kirjaa motivaatioviesti
      let message = '';
      if (playerScore === totalQuestions) {
        message = 'Täydellinen suoritus, agentti! Olet mestari yksityisyyden suojaamisessa. Ansaitsit täydet pisteet!';
      } else if (playerScore >= totalQuestions / 2) {
        message = 'Hienoa työtä, agentti! Saat lisäbuusterin — jatka näin ja kerää lisää pisteitä.';
      } else {
        message = 'Hyvä yritys, agentti! Joka virhe opettaa jotain uutta. Yritä uudelleen ja paranna taitojasi!';
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
        '<a href="index.html" class="next-btn completion-btn" aria-label="' + ui.backToIndex + ' (Paina Enter)">' + ui.backToIndex + '</a>' +
        '<button id="restartBtn" class="next-btn completion-btn" aria-label="' + ui.restart + ' (Paina R)">' + ui.restart + '</button>' +
        '</div>' +
        '<p class="keyboard-hint" style="text-align: center; margin-top: 15px; font-size: 0.9rem; opacity: 0.7;">💡 Vinkki: Pikanäppäimet: R = Uudelleen | Enter = Etusivulle</p>' +
        '</div>';

      document.getElementById('restartBtn').addEventListener('click', function() {
        location.reload();
      });

      // Keyboard navigation for completion screen
      function handleCompletionKeys(e) {
        // R key - restart quiz
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          location.reload();
        }
        // Enter or Space - back to index
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = 'index.html';
        }
      }

      document.addEventListener('keydown', handleCompletionKeys);
    }

    // näytä vastaukset
    function checkAnswer(button, isCorrect) {
      // buttonit pois päältä
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
      
      // Change button text if this is the last question
      if (currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = 'VALMIS 🎉';
      } else {
        nextBtn.textContent = ui.nextBtn;
      }
      
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

    // Näppäimistö pikanäppäimet (A-D tai 1-4)
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
      
      // Enter tai Space - seuraava kysymys
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
    
    // Add permanent keyboard hint after info box
    const permanentHint = document.createElement('p');
    permanentHint.className = 'keyboard-hint-permanent';
    permanentHint.style.cssText = 'text-align: center; margin-top: 15px; font-size: 0.9rem; opacity: 0.7;';
    permanentHint.textContent = '💡 Vinkki: Pikanäppäimet: A-D / 1-4 = Valitse vastaus | Enter/Välilyönti = Seuraava';
    infoEl.parentNode.insertBefore(permanentHint, infoEl.nextSibling);
    
    showQuestion();

  } catch(err) {
    console.error(err);
  }
})();
