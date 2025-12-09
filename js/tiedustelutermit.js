(function() {
    const data = [
      { id: 'firewall', term: "Palomuuri", def: "Valvoo ja rajoittaa verkkoliikennettä sääntöjen perusteella." },
      { id: 'vpn', term: "VPN", def: "Luo salatun 'tunnelin' internetiin ja piilottaa sijaintisi." },
      { id: 'encryption', term: "Salaus", def: "Muuttaa tiedon lukukelvottomaksi ilman oikeaa avainta." },
      { id: 'malware', term: "Haittaohjelma", def: "Ohjelmisto, joka on suunniteltu vahingoittamaan laitetta." },
      { id: 'phishing', term: "Tietojenkalastelu", def: "Huijausviesti, joka yrittää varastaa tunnuksesi tai tietosi." }
    ];
  
    let matches = 0;
    const maxMatches = data.length;
    let selectedTerm = null;
  
    const termsList = document.getElementById('termsList');
    const definitionsList = document.getElementById('definitionsList');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const panelBody = document.querySelector('.panel-body');
  
    function initGame() {
      const shuffledTerms = [...data].sort(() => Math.random() - 0.5);
      const shuffledDefs = [...data].sort(() => Math.random() - 0.5);
  
      shuffledTerms.forEach(item => {
        const el = document.createElement('div');
        el.classList.add('draggable-term');
        el.draggable = true;
        el.textContent = item.term;
        el.dataset.id = item.id;
        
        el.addEventListener('dragstart', handleDragStart);
        el.addEventListener('click', handleTermClick);
        
        termsList.appendChild(el);
      });
  
      shuffledDefs.forEach(item => {
        const el = document.createElement('div');
        el.classList.add('drop-zone');
        el.dataset.matchId = item.id;
        
        const p = document.createElement('p');
        p.textContent = item.def;
        el.appendChild(p);
  
        el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('drag-over'); });
        el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
        el.addEventListener('drop', handleDrop);
        el.addEventListener('click', () => handleDefClick(el));
  
        definitionsList.appendChild(el);
      });
    }
  
    function handleDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
      e.target.classList.add('dragging');
    }
  
    function handleDrop(e) {
      e.preventDefault();
      const zone = e.currentTarget;
      zone.classList.remove('drag-over');
      if (zone.classList.contains('correct')) return;
      const termId = e.dataTransfer.getData('text/plain');
      checkMatch(termId, zone);
    }
  
    function handleTermClick(e) {
      if (selectedTerm) selectedTerm.classList.remove('selected');
      selectedTerm = e.target;
      selectedTerm.classList.add('selected');
      showFeedback("Valitse nyt vastaava määritelmä.", "neutral");
    }
  
    function handleDefClick(zone) {
      if (!selectedTerm || zone.classList.contains('correct')) return;
      checkMatch(selectedTerm.dataset.id, zone);
      selectedTerm.classList.remove('selected');
      selectedTerm = null;
    }
  
    function checkMatch(termId, zone) {
      const targetId = zone.dataset.matchId;
      const termEl = document.querySelector(`.draggable-term[data-id="${termId}"]`);
  
      if (termId === targetId) {
        matches++;
        scoreEl.textContent = matches;
        zone.classList.add('correct');
        termEl.classList.add('matched');
        showFeedback("Oikein yhdistetty!", "success");
        if (matches === maxMatches) setTimeout(finishGame, 800);
      } else {
        showFeedback("Väärin! Termi ja määritelmä eivät täsmää.", "error");
        zone.classList.add('shake');
        setTimeout(() => zone.classList.remove('shake'), 500);
      }
    }
  
    function showFeedback(text, type) {
      feedbackEl.textContent = text;
      feedbackEl.className = 'feedback-box show ' + (type === 'neutral' ? '' : type);
      if (type !== 'neutral') setTimeout(() => feedbackEl.classList.remove('show'), 2000);
    }
  
    function finishGame() {
      const earnedPoints = 200;
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}
  
      panelBody.innerHTML = `
        <div class="completion-screen">
          <div class="completion-trophy">🧩</div>
          <h2 class="completion-title">TERMIT HALLUSSA!</h2>
          <div class="completion-card">
            <div class="completion-emoji">🤓</div>
            <p class="completion-score">${matches} / ${maxMatches} Oikein</p>
            <p class="completion-message">Agentti, tunnet sanaston täydellisesti.</p>
            <hr class="divider">
            <div class="completion-points-wrapper">
               <span class="completion-points">+${earnedPoints} pistettä</span>
            </div>
          </div>
          <div class="completion-buttons">
            <a href="index.html" class="next-btn">Takaisin listaan</a>
          </div>
        </div>
      `;
    }
  
    initGame();
  })();
  