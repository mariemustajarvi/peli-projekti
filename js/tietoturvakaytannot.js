(function() {
  const items = [
    { id: 1, text: "Jaa henkilökohtaisia tietoja sosiaalisessa mediassa", type: "risk" },
    { id: 2, text: "Käytä samaa salasanaa kaikilla tileillä", type: "risk" },
    { id: 3, text: "Pidä ohjelmistot ja sovellukset ajan tasalla", type: "safe" },
    { id: 4, text: "Hyväksy kaikki sovellusten käyttöoikeudet", type: "risk" },
    { id: 5, text: "Ota käyttöön kaksivaiheinen tunnistautuminen", type: "safe" },
    { id: 6, text: "Käytä julkista Wi-Fi:tä pankkitoimintaan", type: "risk" },
    { id: 7, text: "Kirjaudu ulos tileistä jaetuilla tietokoneilla", type: "safe" },
    { id: 8, text: "Jaa salasanat ystävien kanssa", type: "risk" },
    { id: 9, text: "Klikkaa linkkejä epäilyttävissä sähköposteissa", type: "risk" },
    { id: 10, text: "Tarkista HTTPS ennen tietojen syöttämistä", type: "safe" }
  ];

  let itemsLeft = items.length;
  const sourceContainer = document.getElementById('sourceContainer');
  const zones = document.querySelectorAll('.zone');
  const statusText = document.getElementById('statusText');
  const panel = document.querySelector('.panel');
  const resultScreen = document.getElementById('resultScreen');

  function init() {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(item => {
      const el = document.createElement('div');
      el.classList.add('draggable-item');
      el.textContent = item.text;
      el.draggable = true;
      el.dataset.type = item.type;
      
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', item.type);
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
      sourceContainer.appendChild(el);
    });
    updateStatus();
  }

  zones.forEach(zone => {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      
      const type = e.dataTransfer.getData('type');
      const draggingItem = document.querySelector('.dragging');
      
      if (draggingItem && zone.dataset.type === type) {
        draggingItem.remove();
        itemsLeft--;
        updateStatus();
        if (itemsLeft === 0) showCompletion();
      } else {
        alert("Väärä kategoria! Yritä uudelleen.");
      }
    });
  });

  function updateStatus() {
    statusText.textContent = `ASETA VIELÄ ${itemsLeft} KOHDETTA`;
  }

  function showCompletion() {
    panel.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    try {
      let pts = Number(localStorage.getItem('user_points') || 0);
      localStorage.setItem('user_points', pts + 150);
    } catch(e) {}
  }

  init();
})();