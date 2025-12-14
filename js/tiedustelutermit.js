(function() {
  // Kuvan mukaiset 8 paria
  const data = [
    { id: 'malware', term: "Haittaohjelma", def: "Haitallinen ohjelmisto joka on suunniteltu vahingoittamaan laitetta" },
    { id: 'firewall', term: "Palomuuri", def: "Turvajärjestelmä joka valvoo verkkoliikennettä" },
    { id: 'encryption', term: "Salaus", def: "Tietojen muuttaminen salaiseksi koodiksi" },
    { id: 'phishing', term: "Tietojenkalastelu", def: "Väärennettyjä viestejä jotka yrittävät varastaa tietoja" },
    { id: '2fa', term: "2FA", def: "Ylimääräinen turvatoimenpide käyttäen kahta vahvistusta" },
    { id: 'vpn', term: "VPN", def: "Piilottaa IP-osoitteesi ja salaa yhteyden" },
    { id: 'antivirus', term: "Virustorjunta", def: "Ohjelmisto joka tunnistaa ja poistaa haitalliset ohjelmat" },
    { id: 'cookie', term: "Eväste", def: "Pieni tiedosto joka seuraa selausaktiviteettiasi" }
  ];

  let selectedTerm = null;
  let matches = 0;
  let tries = 0;

  const termsList = document.getElementById('termsList');
  const defsList = document.getElementById('defsList');
  const triesEl = document.getElementById('tries');
  const matchesEl = document.getElementById('matches');
  const completionOverlay = document.getElementById('completionOverlay');

  function init() {
    // Luodaan termit (vasen)
    data.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'game-btn';
      btn.textContent = item.term;
      btn.dataset.id = item.id;
      btn.dataset.type = 'term';
      btn.addEventListener('click', handleClick);
      termsList.appendChild(btn);
    });

    // Luodaan määritelmät (oikea) - sekoitettuna
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    shuffledData.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'game-btn';
      btn.textContent = item.def;
      btn.dataset.id = item.id;
      btn.dataset.type = 'def';
      btn.addEventListener('click', handleClick);
      defsList.appendChild(btn);
    });
  }

  function handleClick(e) {
    const clickedBtn = e.target;

    // Jos klikataan jo ratkaistua
    if (clickedBtn.classList.contains('correct')) return;

    // Jos on määritelmä mutta ei valittua termiä -> ei tehdä mitään (tai ilmoitetaan)
    if (clickedBtn.dataset.type === 'def' && !selectedTerm) return;

    // 1. Valitaan termi
    if (clickedBtn.dataset.type === 'term') {
      // Poista vanha valinta
      if (selectedTerm) selectedTerm.classList.remove('selected');
      
      selectedTerm = clickedBtn;
      selectedTerm.classList.add('selected');
    }
    
    // 2. Valitaan määritelmä (kun termi on valittu)
    else if (clickedBtn.dataset.type === 'def' && selectedTerm) {
      tries++;
      triesEl.textContent = tries;

      if (clickedBtn.dataset.id === selectedTerm.dataset.id) {
        // OIKEIN
        handleMatch(selectedTerm, clickedBtn);
      } else {
        // VÄÄRIN
        handleMismatch(clickedBtn);
      }
    }
  }

  function handleMatch(termBtn, defBtn) {
    termBtn.classList.remove('selected');
    termBtn.classList.add('correct');
    defBtn.classList.add('correct');
    
    matches++;
    matchesEl.textContent = `${matches}/8`;
    selectedTerm = null;

    if (matches === 8) {
      setTimeout(() => completionOverlay.classList.remove('hidden'), 500);
    }
  }

  function handleMismatch(defBtn) {
    defBtn.classList.add('wrong');
    setTimeout(() => defBtn.classList.remove('wrong'), 400);
    // Pidetään termi valittuna, jotta voi yrittää toista
  }

  init();
})();