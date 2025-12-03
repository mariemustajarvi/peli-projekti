// Quiz script
(function(){
  const panelBody = document.querySelector('.panel-body');

  try{
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
        { id: 'q1', scenario: 'Luot sosiaalisen median profiilia. Mitkä tiedot on turvallista jakaa julkisesti? <br><br>Mitä sinun pitäisi jakaa?</br></br>', options: [ {id:'A',text:'Koko nimesi, puhelinnumerosi ja osoitteesi'}, {id:'B',text:'Vain etunimesi ja harrastuksesi'}, {id:'C',text:'Koulusi nimi ja tuntisuunnitelma'}, {id:'D',text:'Syntymäpäiväsi mukaan lukien vuosi'} ], correct:'B', explanation:'Jaa vain perus- ja ei-arkaluonteisia tietoja julkisesti. Etunimesi ja harrastuksesi ovat turvallisia. Älä koskaan jaa osoitettasi, puhelinnumeroasi, koulutietojasi tai tarkkaa syntymäpäivääsi julkisesti.' },
        { id: 'q2', scenario: 'Uusi sovellus pyytää lupaa käyttää yhteystietojasi, sijaintiasi, kameraasi ja mikrofoniasi. <br><br>Mitä sinun pitäisi harkita?</br></br>', options: [ {id:'A',text:'Hyväksy kaikki luvat käyttääksesi kaikkia ominaisuuksia'}, {id:'B',text:'Estää kaikki'}, {id:'C',text:'Myöntää vain luvat, joita sovellus todella tarvitsee'}, {id:'D',text:'Sillä ei ole väliä, kaikki sovellukset tarvitsevat näitä'} ], correct:'C', explanation:'Anna sovelluksille vain ne luvat, joita ne todella tarvitsevat! Kuvankäsittelysovellus tarvitsee kameran mutta ei yhteystietojasi. Tarkista jokainen lupa ja mieti miksi sovellus tarvitsee sitä.' },
        { id: 'q3', scenario: 'Käytät julkista tietokonetta kirjastossa. Mitä sinun pitäisi tehdä kun olet valmis? <br><br>Paras käytäntö?</br></br>', options: [ {id:'A',text:'Kirjautua ulos ja tyhjentää selaushistoria'}, {id:'B',text:'Vain sulkea selain'}, {id:'C',text:'Jättää kaikki auki seuraavalle henkilölle'}, {id:'D',text:'Kirjautua ulos vain tärkeistä tileistä'} ], correct:'A', explanation:'Kirjaudu aina kokonaan ulos ja tyhjennä selaushistoria julkisilla tietokoneilla. Tämä estää seuraavaa henkilöä pääsemästä tileillesi tai näkemästä henkilökohtaista tietojasi.' },
        { id: 'q4', scenario: 'Verkkosivusto käyttää evästeitä ja pyytää suostumustasi. Mitä sinun pitäisi tietää? <br><br>Mihin evästeitä käytetään?</br></br>', options: [ {id:'A',text:'Ne ovat vain verkkosivustojen toimimista varten'}, {id:'B',text:'Ne ovat harmittomia ja aina hyödyllisiä'}, {id:'C',text:'Ne voivat seurata selaustasi ja kerätä tietoja sinusta'}, {id:'D',text:'Ne tallentavat vain salasanasi'} ], correct:'C', explanation:'Evästeet voivat seurata verkkoaktiivisuuttasi verkkosivustoilla! Osa on tarpeen verkkosivustojen toimimiseksi mutta monet seuraavat sinua mainostarkoituksiin. Tarkista evästeasetukset ja hyväksy vain mitä olet valmis hyväksymään.' },
        { id: 'q5', scenario: 'Haluat käyttää ilmaista WiFi:tä kahvilassa tarkistaaksesi pankkitilisi. <br><br>Onko tämä turvallista?</br></br>', options: [ {id:'A',text:'Kyllä, ilmainen WiFi on aina turvallista käyttää'}, {id:'B',text:'Kyllä mutta vain jos käytät puhelintasi'}, {id:'C',text:'Ei, vältä arkaluonteisten tietojen tarkistamista julkisissa verkoissa'}, {id:'D',text:'Kyllä, jos kahvila näyttää luotettavalta'} ], correct:'C', explanation:'Julkinen WiFi EI ole turvallinen! Kuka tahansa samassa verkossa voi mahdollisesti nähdä tietosi. Älä koskaan käytä arkaluontoisia tilejä (pankki, sähköpostin salasanat) julkisessa WiFi:ssä ilman VPN:ää.' },
        { id: 'q6', scenario: 'Sovellus haluaa tietää sijaintisi "aina", jopa kun et käytä sovellusta. <br><br>Mitä sinun piäisi tehdä?</br></br>', options: [ {id:'A',text:'Sallia se - ne luultavasti tarvitsevat sitä'}, {id:'B',text:'Sillä ei ole väliä'}, {id:'C',text:'Vaihtaa se "vain sovelluksen käytön aikana" tai estää'}, {id:'D',text:'Salli se mutta sammuttaa se myöhemmin'} ], correct:'C', explanation:'Sovellukset harvoin tarvitsevat sijaintiasi "aina"! Tämä seuraa sinua jatkuvasti. Valitse "sovelluksen käytön aikana", jotta voit hallita milloin ne näkevät sijaintisi. Suojaa yksityisyyttäsi rajoittamalla seurantaa.' }
      ]
    };
    
    const questions = data.questions;
    const ui = data.ui;
    const qTotal = questions.length;

    // Set up page text
    document.querySelector('.back-btn').innerHTML = ui.backBtnText;
    document.querySelector('.panel-title').innerHTML = ui.panelTitle;
    document.querySelector('.panel-sub').innerHTML = `${ui.panelSubPrefix} <span id="qIndex">1</span> / <span id="qTotal">${qTotal}</span> | ${ui.scoreLabel} <span id="score">0</span> / <span id="maxScore">${qTotal}</span>`;
    document.querySelector('.q-label').innerHTML = ui.scenarioLabel;

    // Quiz state
    let qIndex = 0;
    let score = 0;

    // Load saved progress
    try{
      const saved = JSON.parse(localStorage.getItem('tietosuoja_progress'));
      if(saved){
        qIndex = saved.qIndex;
        score = saved.score;
      }
    }catch(e){}

    // Get elements
    const qIndexEl = document.getElementById('qIndex');
    const scoreEl = document.getElementById('score');
    const scenarioEl = document.getElementById('scenario');
    const optionsEl = document.getElementById('options');
    const infoEl = document.getElementById('info');
    const infoText = document.getElementById('infoText');
    const nextBtn = document.getElementById('nextBtn');

    // Save progress
    function saveProgress(){
      localStorage.setItem('tietosuoja_progress', JSON.stringify({qIndex, score}));
    }

    // Show question
    function renderQuestion(){
      const q = questions[qIndex];
      qIndexEl.textContent = qIndex + 1;

      // Split scenario text
      const parts = q.scenario.split('<br><br>');
      scenarioEl.innerHTML = parts[0];
      document.getElementById('followup').innerHTML = parts[1] || '';

      // Reset
      optionsEl.innerHTML = '';
      infoEl.className = 'info-box';
      infoEl.setAttribute('aria-hidden','true');
      nextBtn.disabled = true;

      // Create option buttons
      q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.dataset.optId = opt.id;
        btn.textContent = opt.id + '. ' + opt.text;
        optionsEl.appendChild(btn);
      });

      saveProgress();
    }

    // Quiz complete
    function finishQuiz(){
      localStorage.removeItem('tietosuoja_progress');
      document.querySelector('.panel-header').style.display = 'none';

      // Calculate points
      const maxPoints = 200;
      const earned = Math.round((score / qTotal) * maxPoints);

      // Save points
      try{
        const current = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', current + earned);
      }catch(e){}

      // Get motivational text
      let boostText = '';
      if(score === qTotal){
        boostText = 'Täydellinen suoritus, agentti! Olet mestari yksityisyyden suojaamisessa. Ansaitsit täydet pisteet!';
      } else if(score >= qTotal / 2){
        boostText = 'Hienoa työtä, agentti! Saat lisäbuusterin — jatka näin ja kerää lisää pisteitä.';
      } else {
        boostText = 'Hyvä yritys, agentti! Joka virhe opettaa jotain uutta. Yritä uudelleen ja paranna taitojasi!';
      }

      // Show completion screen
      panelBody.innerHTML = `
        <div style="padding:18px;text-align:center;">
          <div style="font-size:50px;margin-bottom:16px">🏆</div>
          <h2 style="color:#9ff8e8;letter-spacing:2px;margin:0 0 20px 0;font-size:24px;text-transform:uppercase">${ui.finishedHeading}</h2>
          <div style="margin:14px auto 8px;max-width:640px;padding:20px;border:1px solid rgba(7,219,208,0.08);border-radius:8px;background:rgba(0,0,0,0.15)">
            <div style="font-size:42px;margin-bottom:12px">👍</div>
            <p style="color:#bffefe;font-weight:700;margin:6px 0;font-size:20px">${score} / ${qTotal} oikein</p>
            <p style="color:#9ff8e8;margin:12px 0;font-size:16px;line-height:1.6">${boostText}</p>
            <hr style="border:none;border-top:1px solid rgba(7,219,208,0.3);margin:16px auto;width:100%">
            <div style="margin-top:12px;">
              <span style="display:inline-block;padding:10px 14px;border-radius:6px;border:1px solid rgba(7,219,208,0.12);background:linear-gradient(90deg, rgba(52,255,208,0.06), rgba(52,255,208,0.02));color:#bffefe;font-weight:700">+${earned} pistettä</span>
            </div>
          </div>
          <div style="margin-top:18px;display:flex;gap:12px;justify-content:center;max-width:720px;margin-left:auto;margin-right:auto">
            <a href="index.html" class="next-btn" style="flex:1;max-width:48%">${ui.backToIndex}</a>
            <button id="restartBtn" class="next-btn" style="flex:1;max-width:48%">${ui.restart}</button>
          </div>
        </div>
      `;

      document.getElementById('restartBtn').addEventListener('click', ()=> location.reload());
    }

    // Mark answer
    function markAnswer(btn, correct){
      // Disable all options
      Array.from(optionsEl.children).forEach(o => o.classList.add('disabled'));
      
      if(correct){
        btn.classList.add('selected-correct');
        score++;
        infoEl.classList.add('info-success');
        infoText.textContent = questions[qIndex].explanation;
      } else {
        btn.classList.add('selected-wrong');
        const correctBtn = Array.from(optionsEl.children).find(c => c.dataset.optId === questions[qIndex].correct);
        if(correctBtn) correctBtn.classList.add('correct');
        infoEl.classList.add('info-warn');
        infoText.textContent = '💡 ' + questions[qIndex].explanation;
      }
      
      infoEl.setAttribute('aria-hidden','false');
      scoreEl.textContent = score;
      nextBtn.disabled = false;
      saveProgress();
    }

    // Click option
    optionsEl.addEventListener('click', (e)=>{
      const btn = e.target.closest('.option');
      if(!btn || btn.classList.contains('disabled')) return;
      markAnswer(btn, btn.dataset.optId === questions[qIndex].correct);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e)=>{
      const key = e.key.toUpperCase();
      if(/^[A-D]$/.test(key)){
        const btn = Array.from(optionsEl.children).find(c => c.dataset.optId === key);
        if(btn && !btn.classList.contains('disabled')) btn.click();
      }
      if(/^[1-4]$/.test(e.key)){
        const btn = optionsEl.children[Number(e.key)-1];
        if(btn && !btn.classList.contains('disabled')) btn.click();
      }
    });

    // Next button
    nextBtn.addEventListener('click', ()=>{
      qIndex++;
      if(qIndex >= qTotal){
        finishQuiz();
      } else {
        renderQuestion();
      }
    });

    // Set button text
    nextBtn.textContent = ui.nextBtn;

    // Start quiz
    renderQuestion();

  } catch(err){
    console.error(err);
  }
})();
