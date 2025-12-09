(function() {
    const gameData = [
      { id: 1, text: "Lukitse tietokone aina poistuessasi", type: "safe" },
      { id: 2, text: "Kirjoita salasana post-it lapulle", type: "risk" },
      { id: 3, text: "Lainaa tunnuksesi työkaverille", type: "risk" },
      { id: 4, text: "Käytä monivaiheista tunnistautumista (MFA)", type: "safe" },
      { id: 5, text: "Liitä löytämäsi USB-tikku koneeseen", type: "risk" },
      { id: 6, text: "Raportoi tietoturvapoikkeamat heti", type: "safe" }
    ];
  
    let score = 0;
    let itemsLeft = gameData.length;
    let selectedCard = null;
  
    const cardContainer = document.getElementById('cardContainer');
    const zones = document.querySelectorAll('.zone');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const panelBody = document.querySelector('.panel-body');
  
    function initGame() {
      const shuffled = [...gameData].sort(() => Math.random() - 0.5);
      shuffled.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('draggable-card');
        card.draggable = true;
        card.textContent = item.text;
        card.dataset.type = item.type;
        card.dataset.id = item.id;
        
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('click', handleCardClick);
  
        cardContainer.appendChild(card);
      });
    }
  
    function handleDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.type);
      e.dataTransfer.setData('cardId', e.target.dataset.id);
      e.target.classList.add('dragging');
      setTimeout(() => (e.target.style.opacity = '0.5'), 0);
    }
  
    function handleDragEnd(e) {
      e.target.classList.remove('dragging');
      e.target.style.opacity = '1';
      zones.forEach(z => z.classList.remove('drag-over'));
    }
  
    zones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', handleDrop);
      zone.addEventListener('click', () => {
        if (selectedCard) {
          processMove(selectedCard, zone.dataset.type);
          selectedCard.classList.remove('selected');
          selectedCard = null;
        }
      });
    });
  
    function handleDrop(e) {
      e.preventDefault();
      const cardId = e.dataTransfer.getData('cardId');
      const zoneType = e.currentTarget.dataset.type;
      const card = document.querySelector(`.draggable-card[data-id="${cardId}"]`);
      if (card) processMove(card, zoneType);
    }
  
    function handleCardClick(e) {
      if (selectedCard === e.target) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
        return;
      }
      if (selectedCard) selectedCard.classList.remove('selected');
      selectedCard = e.target;
      selectedCard.classList.add('selected');
      showFeedback("Valitse nyt 'Turvallinen' tai 'Riski' laatikko.", "neutral");
    }
  
    function processMove(card, zoneType) {
      const cardType = card.dataset.type;
      if (cardType === zoneType) {
        score++;
        itemsLeft--;
        scoreEl.textContent = score;
        showFeedback("Oikein! Hyvä valinta.", "correct");
        card.classList.add('gone');
        if (itemsLeft === 0) setTimeout(finishGame, 800);
      } else {
        showFeedback("Väärä laatikko! Yritä uudelleen.", "wrong");
      }
    }
  
    function showFeedback(text, type) {
      feedbackEl.textContent = text;
      feedbackEl.className = 'feedback-box show ' + type;
      if(type !== 'correct') setTimeout(() => feedbackEl.classList.remove('show'), 2000);
    }
  
    function finishGame() {
      const earnedPoints = 150;
      try {
        const currentPoints = Number(localStorage.getItem('user_points') || 0);
        localStorage.setItem('user_points', currentPoints + earnedPoints);
      } catch(e) {}
  
      panelBody.innerHTML = `
        <div class="completion-screen">
          <div class="completion-trophy">🏆</div>
          <h2 class="completion-title">KÄYTÄNNÖT LUOKITELTU!</h2>
          <div class="completion-card">
            <div class="completion-emoji">🔒</div>
            <p class="completion-score">${score} / 6 Oikein</p>
            <p class="completion-message">Erinomaista työtä, agentti!</p>
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