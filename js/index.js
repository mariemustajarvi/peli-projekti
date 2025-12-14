import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';

import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

const firebaseConfig = {

  apiKey: "AIzaSyCUZNqdanUH2Z63t5GWw1JjY-0ffwqCy7I",

  authDomain: "tuotekehitysprojekti-5f330.firebaseapp.com",

  projectId: "tuotekehitysprojekti-5f330",

  storageBucket: "tuotekehitysprojekti-5f330.firebasestorage.app",

  messagingSenderId: "362924183192",

  appId: "1:362924183192:web:337b854b2ecc8b53e48aed",

  databaseURL: "https://tuotekehitysprojekti-5f330-default-rtdb.europe-west1.firebasedatabase.app"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const loginBtn = document.getElementById('logInOutBtnLink');
const loginBtnText = document.getElementById('logInOutBtnText');

const agentCode = document.getElementById('agent-code');
const score = document.getElementById('agent-points');
const missions = document.getElementById('agent-missions');
const progress = document.getElementById('agent-progress');

const agentRank = document.getElementById('agent-rank');
const agentNextRank = document.getElementById('agent-next-rank');
const agentRankIcon = document.getElementById('agent-rank-icon');
const agentPanelHeader = document.querySelector('.agent-panel__header');
const agentNextRankPanel = document.getElementById('agentNextRankPanel');
const agentNextRankPoints = document.getElementById('agent-next-points');
const agentNextRankBar = document.getElementById("agent-next-progress");
const agentPanel = document.querySelector('.agent-panel');
const welcomeText = document.getElementById('welcomeText');
const welcomeUsername = document.getElementById('welcomeUsername');
const achievementsText = document.getElementById('achievementsText');

let loggedIn = false; // Tätä käytetään vain tarkistamaan tarvitseeko käyttäjää kirjata ulos nappia painettaessa!
let completed = new Set();

// Piilota agentti-paneeli oletuksena
if (agentPanel) {
  agentPanel.style.display = 'none';
}
if (welcomeText) {
  welcomeText.style.display = 'none';
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn = true;
    loginBtnText.innerHTML = 'Kirjaudu ulos';
    
    // Tyhjennä aiemmat tiedot ennen uuden käyttäjän tietojen lataamista
    completed.clear();
    
    // Näytä agentti-paneeli kirjautuneena
    if (agentPanel) {
      agentPanel.style.display = 'block';
    }
    
    // Näytä tervetuloviesti
    if (welcomeText) {
      welcomeText.style.display = 'block';
    }

    const userId = user.uid;
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        agentCode.innerHTML = data.username;
        
        // Päivitä tervetuloviesti käyttäjänimellä
        if (welcomeUsername) {
          welcomeUsername.textContent = data.username;
        }

        // Laske mission pisteet
        const missionScore = data.scores.reduce((partialSum, a) => partialSum + a, 0);
        
        // Laske achievement pisteet ja määrä
        const achievementStats = typeof window.getAchievementStats === 'function' 
          ? window.getAchievementStats(data.achievements)
          : { points: 0, count: 0 };
        
        // Päivitä saavutusten määrä
        if (achievementsText) {
          achievementsText.textContent = `Saavutukset (${achievementStats.count}/25)`;
        }
        
        const currentScore = missionScore + achievementStats.points;
        score.innerHTML = currentScore;

        const completedMissions = data.completedMissions;
        let missionCount = 0;
        
        // Tyhjennä completed ennen uuden datan lisäämistä
        completed.clear();
        
        completedMissions.forEach((element, index) => {
          if (element == true) {
            completed.add('mission' + index);
            missionCount++;
          }
        });

        missions.innerHTML = missionCount + ' / 10';

        if (missionCount > 0) {
          progress.innerHTML = (missionCount / 10) * 100 + ' %'
        }

        const RANKS = [
          { name: "ALOITTELIJA-AGENTTI", minPoints: 0, icon: "🔰", color: "#6B7280" },
          { name: "AGENTTI", minPoints: 500, icon: "🔷", color: "#28ADF1" },
          { name: "KENTTÄAGENTTI", minPoints: 1500, icon: "🎯", color: "#8B5CF6" },
          { name: "VETERAANI-AGENTTI", minPoints: 2500, icon: "⭐", color: "#10B981" },
          { name: "ELITE-AGENTTI", minPoints: 3500, icon: "🏆", color: "#F59E0B" }
        ];

        let currentRank = 0;
        let nextRank = 0;

        if (currentScore >= 3500) {
          currentRank = RANKS[4];
          agentNextRankPanel.style.visibility = "hidden";
        } else if (currentScore >= 2500) {
          currentRank = RANKS[3];
          nextRank = RANKS[4]
        } else if (currentScore >= 1500) {
          currentRank = RANKS[2];
          nextRank = RANKS[3]
        } else if (currentScore >= 500) {
          currentRank = RANKS[1];
          nextRank = RANKS[2]
        } else {
          currentRank = RANKS[0];
          nextRank = RANKS[1]
        }

        if (agentRank) {
          agentRank.textContent = currentRank.name;
        }

        if (agentRankIcon) {
          agentRankIcon.textContent = currentRank.icon;
        }

        if (agentPanelHeader && currentRank.color) {
          agentPanelHeader.style.background = currentRank.color;
        }

        if (agentNextRank && nextRank != 0) {
          agentNextRank.innerHTML = nextRank.name;
        }

        if (agentNextRankPoints) {
          agentNextRankPoints.innerHTML = nextRank.minPoints - currentScore + ' pistettä puuttuu';
        }

        if (agentNextRankBar) {
          agentNextRankBar.style.width = Math.floor((currentScore / nextRank.minPoints) * 100) + '%';
        }

        setupIndexPage();
      }
    })
  } else {
    loggedIn = false;
    loginBtnText.innerHTML = "Kirjaudu sisään / Rekisteröidy"
    
    // Piilota agentti-paneeli kun ei ole kirjautunut
    if (agentPanel) {
      agentPanel.style.display = 'none';
    }
    
    // Piilota tervetuloviesti
    if (welcomeText) {
      welcomeText.style.display = 'none';
    }
    
    // Tyhjennä completed-lista
    completed.clear();
    
    // Näytä pelit kirjautumattomille
    setupIndexPageForGuest();
  }
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (loggedIn) {
    signOut(auth).then(() => {
      loginBtnText.innerHTML = "Kirjaudu sisään / Rekisteröidy"
    })
  } else {
    window.location.href = loginBtn.href;
  }
});

function setupIndexPage() {
  const gameList = document.querySelector(".game-list");
  if (!gameList) return; // ei olla index-sivulla

  const cards = Array.from(gameList.querySelectorAll(".game-card"));

  // Käydään kortit läpi järjestyksessä: 1. kortti = mission1, 2. = mission2...
  cards.forEach((card, index) => {

    const missionId = card.dataset.missionId || `mission${index}`;
    const prevMissionId =
      index === 0 ? null : (cards[index - 1].dataset.missionId || `mission${index - 1}`);

    const isFirst = index === 0;
    const isCompleted = completed.has(missionId);
    const isUnlocked = isFirst || (prevMissionId && completed.has(prevMissionId));

    const lockIcon = card.querySelector(".game-card__lock");

    // Tarkista jos missio on suoritettu
    if (isCompleted) {
      card.classList.add("game-card--completed");
      card.classList.remove("game-card--locked", "game-card--active");
      card.style.opacity = "1";
      
      if (lockIcon) {
        lockIcon.style.display = "none";
      }

      // Päivitä nappi suoritetuille missioille
      let cta = card.querySelector(".game-card__cta");
      if (!cta) {
        const footer = card.querySelector(".game-card__footer");
        if (footer) {
          cta = document.createElement("a");
          cta.className = "game-card__cta";
          cta.dataset.dynamic = "true"; // Merkitse dynaamisesti luoduksi
          footer.appendChild(cta);
        }
      }

      if (cta) {
        cta.textContent = "SUORITA UUDELLEEN";
        const url = card.dataset.missionUrl;
        if (url) {
          cta.href = url;
        } else {
          cta.href = "#";
        }
        cta.style.pointerEvents = "auto";
        cta.style.opacity = "1";
      }
    } else if (isUnlocked) {
      // Tee kortista "aktiivinen" (samannäköinen kun eka)
      card.classList.add("game-card--active");
      card.classList.remove("game-card--locked");
      card.style.opacity = "1";

      if (lockIcon) {
        lockIcon.style.display = "none";
      }

      // Luo CTA-nappi, jos sitä ei vielä ole
      let cta = card.querySelector(".game-card__cta");
      if (!cta) {
        const footer = card.querySelector(".game-card__footer");
        if (footer) {
          cta = document.createElement("a");
          cta.className = "game-card__cta";
          cta.textContent = "Aloita missio";
          cta.dataset.dynamic = "true"; // Merkitse dynaamisesti luoduksi
          footer.appendChild(cta);
        }
      }

      if (cta) {
        const url = card.dataset.missionUrl;
        if (url) {
          cta.href = url;
        } else {
          cta.href = "#";
        }
        cta.style.pointerEvents = "auto";
        cta.style.opacity = "1";
      }
    } else if (isCompleted) {
      // Pidä kortti lukittuna
      card.classList.add("game-card--locked");
      card.classList.remove("game-card--active");
      card.style.opacity = "0.7";

      const cta = card.querySelector(".game-card__cta");
      if (cta) {
        cta.style.pointerEvents = "none";
        cta.style.opacity = "0.4";
        cta.addEventListener("click", (ev) => ev.preventDefault());
      }
      if (lockIcon) {
        lockIcon.style.display = "";
      }
    }
  });
};

function setupIndexPageForGuest() {
  const gameList = document.querySelector(".game-list");
  if (!gameList) return;

  const cards = Array.from(gameList.querySelectorAll(".game-card"));

  // Näytä kaikki pelit kirjautumattomille, mutta lukittuina
  cards.forEach((card) => {
    // Poista kaikki tilat ja aseta lukittu
    card.classList.add("game-card--locked");
    card.classList.remove("game-card--active", "game-card--completed");
    card.style.opacity = "0.7";

    // Poista dynaamisesti luodut napit, säilytä vain staattiset
    const cta = card.querySelector(".game-card__cta");
    if (cta) {
      if (cta.dataset.dynamic === "true") {
        cta.remove();
      } else {
        cta.textContent = "Aloita missio";
        cta.style.pointerEvents = "none";
        cta.style.opacity = "0.4";
      }
    }
    
    const lockIcon = card.querySelector(".game-card__lock");
    if (lockIcon) {
      lockIcon.style.display = "";
    }
  });
}

  authDomain: "tuotekehitysprojekti-5f330.firebaseapp.com",

  projectId: "tuotekehitysprojekti-5f330",

  storageBucket: "tuotekehitysprojekti-5f330.firebasestorage.app",

  messagingSenderId: "362924183192",

  appId: "1:362924183192:web:337b854b2ecc8b53e48aed",

  databaseURL: "https://tuotekehitysprojekti-5f330-default-rtdb.europe-west1.firebasedatabase.app"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const loginBtn = document.getElementById('loginLogoutBtn');
const loginBtnText = document.getElementById('loginLogoutText');

const agentCode = document.getElementById('agent-code');
const score = document.getElementById('agent-points');
const missions = document.getElementById('agent-missions');
const progress = document.getElementById('agent-progress');

const agentRank = document.getElementById('agent-rank');
const agentNextRank = document.getElementById('agent-next-rank');
const agentRankIcon = document.getElementById('agent-rank-icon');
const agentPanelHeader = document.querySelector('.agent-panel__header');
const agentNextRankPanel = document.getElementById('agentNextRankPanel');
const agentNextRankPoints = document.getElementById('agent-next-points');
const agentNextRankBar = document.getElementById("agent-next-progress");

let loggedIn = false; // Tätä käytetään vain tarkistamaan tarvitseeko käyttäjää kirjata ulos nappia painettaessa!
let completed = new Set();

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn = true;
    loginBtnText.innerHTML = 'Kirjaudu ulos';

    const userId = user.uid;
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        agentCode.innerHTML = data.username;

        const currentScore = data.scores.reduce((partialSum, a) => partialSum + a, 0);
        score.innerHTML = currentScore;

        const completedMissions = data.completedMissions;
        let missionCount = 0;
        completedMissions.forEach(element => {
          if (element == true) {
            completed.add('mission' + missionCount);
            missionCount++;
          }
        });

        missions.innerHTML = missionCount + ' / 10';

        if (missionCount > 0) {
          progress.innerHTML = (missionCount / 10) * 100 + ' %'
        }

        const RANKS = [
          { name: "ALOITTELIJA-AGENTTI", minPoints: 0, icon: "🔰", color: "#6B7280" },
          { name: "AGENTTI", minPoints: 500, icon: "🔷", color: "#28ADF1" },
          { name: "KENTTÄAGENTTI", minPoints: 1500, icon: "🎯", color: "#8B5CF6" },
          { name: "VETERAANI-AGENTTI", minPoints: 2500, icon: "⭐", color: "#10B981" },
          { name: "ELITE-AGENTTI", minPoints: 3500, icon: "🏆", color: "#F59E0B" }
        ];

        let currentRank = 0;
        let nextRank = 0;

        if (currentScore >= 3500) {
          currentRank = RANKS[4];
          agentNextRankPanel.style.visibility = "hidden";
        } else if (currentScore >= 2500) {
          currentRank = RANKS[3];
          nextRank = RANKS[4]
        } else if (currentScore >= 1500) {
          currentRank = RANKS[2];
          nextRank = RANKS[3]
        } else if (currentScore >= 500) {
          currentRank = RANKS[1];
          nextRank = RANKS[2]
        } else {
          currentRank = RANKS[0];
          nextRank = RANKS[1]
        }

        if (agentRank) {
          agentRank.textContent = currentRank.name;
        }

        if (agentRankIcon) {
          agentRankIcon.textContent = currentRank.icon;
        }

        if (agentPanelHeader && currentRank.color) {
          agentPanelHeader.style.background = currentRank.color;
        }

        if (agentNextRank && nextRank != 0) {
          agentNextRank.innerHTML = nextRank.name;
        }

        if (agentNextRankPoints) {
          agentNextRankPoints.innerHTML = nextRank.minPoints - currentScore + ' pistettä puuttuu';
        }

        if (agentNextRankBar) {
          agentNextRankBar.style.width = Math.floor((currentScore / nextRank.minPoints) * 100) + '%';
        }

        setupIndexPage();
      }
    })
  } else {
    loggedIn = false;
    loginBtnText.innerHTML = "Kirjaudu sisään / Rekisteröidy"
  }
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (loggedIn) {
    signOut(auth).then(() => {
      loginBtnText.innerHTML = "Kirjaudu sisään / Rekisteröidy"
      location.reload();
    })
  } else {
    window.location.href = loginBtn.href;
  }
});

function setupIndexPage() {
  const gameList = document.querySelector(".game-list");
  if (!gameList) return; // ei olla index-sivulla

  const cards = Array.from(gameList.querySelectorAll(".game-card"));

  // Käydään kortit läpi järjestyksessä: 1. kortti = mission1, 2. = mission2...
  cards.forEach((card, index) => {

    const missionId = card.dataset.missionId || `mission${index}`;
    const prevMissionId =
      index === 0 ? null : (cards[index - 1].dataset.missionId || `mission${index - 1}`);

    const isFirst = index === 0;
    const isUnlocked = isFirst || (prevMissionId && completed.has(prevMissionId));

    const lockIcon = card.querySelector(".game-card__lock");

    if (isUnlocked) {
      // Tee kortista "aktiivinen" (samannäköinen kun eka)
      card.classList.add("game-card--active");
      card.classList.remove("game-card--locked");
      card.style.opacity = "1";

      if (lockIcon) {
        lockIcon.style.display = "none";
      }

      // Luo CTA-nappi, jos sitä ei vielä ole
      let cta = card.querySelector(".game-card__cta");
      if (!cta) {
        const footer = card.querySelector(".game-card__footer");
        if (footer) {
          cta = document.createElement("a");
          cta.className = "game-card__cta";
          cta.textContent = "Aloita missio";
          footer.appendChild(cta);
        }
      }

      if (cta) {
        const url = card.dataset.missionUrl;
        if (url) {
          cta.href = url;
        } else {
          cta.href = "#";
        }
        cta.style.pointerEvents = "auto";
        cta.style.opacity = "1";
      }
    } else {
      // Pidä kortti lukittuna
      card.classList.add("game-card--locked");
      card.classList.remove("game-card--active");
      card.style.opacity = "0.7";

      const cta = card.querySelector(".game-card__cta");
      if (cta) {
        cta.style.pointerEvents = "none";
        cta.style.opacity = "0.4";
        cta.addEventListener("click", (ev) => ev.preventDefault());
      }
      if (lockIcon) {
        lockIcon.style.display = "";
      }
    }
  });
};
