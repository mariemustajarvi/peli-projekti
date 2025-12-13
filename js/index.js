
// Käyttää localStoragea (myöhemmin voidaan vaihtaa Firebaseen).
// VÄLIAIKAINEN: Näytä agenttipaneeli vain kirjautuneille (localStorage)
// Korvaa tämä Firebase-toteutuksella myöhemmin

(function () {
  const STORAGE_KEY = "kyberagentti_progress_v1";

  // Agenttien arvot pisteiden mukaan
  const RANKS = [
    { name: "ALOITTELIJA-AGENTTI", minPoints: 0, icon: "🔰", color: "#6B7280" },
    { name: "AGENTTI", minPoints: 500, icon: "🔷", color: "#28ADF1" },
    { name: "KENTTÄAGENTTI", minPoints: 1500, icon: "🎯", color: "#8B5CF6" },
    { name: "VETERAANI-AGENTTI", minPoints: 2500, icon: "⭐", color: "#10B981" },
    { name: "ELITE-AGENTTI", minPoints: 3500, icon: "🏆", color: "#F59E0B" }
  ];

  // Pisteet per missio
  const MISSION_POINTS = {
    mission1: 100,
    mission2: 150,
    mission3: 150,
    mission4: 200,
    mission5: 200,
    mission6: 150,
    mission7: 200,
    mission8: 250,
    mission9: 250,
    mission10: 300
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completed: [] };
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.completed)) {
        parsed.completed = [];
      }
      return parsed;
    } catch (e) {
      console.warn("Virhe luettaessa tilaa, käytetään oletusta:", e);
      return { completed: [] };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Virhe tallennettaessa tilaa:", e);
    }
  }

  function markMissionCompleted(missionId) {
    const state = loadState();
    const set = new Set(state.completed);
    set.add(missionId);
    state.completed = Array.from(set);
    saveState(state);
    return state;
  }

  function calculatePoints(completedMissions) {
    let totalPoints = 0;
    completedMissions.forEach(missionId => {
      totalPoints += MISSION_POINTS[missionId] || 0;
    });
    return totalPoints;
  }

  function getRank(points) {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (points >= RANKS[i].minPoints) {
        return RANKS[i];
      }
    }
    return RANKS[0];
  }

  function getNextRank(currentRank) {
    const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
    if (currentIndex < RANKS.length - 1) {
      return RANKS[currentIndex + 1];
    }
    return null; // Maksimiarvo saavutettu
  }

  function updateAgentPanel() {
    const state = loadState();
    const completed = state.completed || [];
    const points = calculatePoints(completed);
    const currentRank = getRank(points);
    const nextRank = getNextRank(currentRank);

    // Päivitä pisteet
    const pointsEl = document.getElementById("agent-points");
    if (pointsEl) {
      pointsEl.textContent = points;
    }

    // Päivitä missiot
    const missionsEl = document.getElementById("agent-missions");
    if (missionsEl) {
      missionsEl.textContent = `${completed.length}/10`;
    }

    // Päivitä valmistumisprosentti
    const progressEl = document.getElementById("agent-progress");
    if (progressEl) {
      const percentage = Math.round((completed.length / 10) * 100);
      progressEl.textContent = `${percentage}%`;
    }

    // Päivitä agenttiarvo
    const rankEl = document.getElementById("agent-rank");
    if (rankEl) {
      rankEl.textContent = currentRank.name;
    }


    // Päivitä agenttiarvo ikoni
    const rankIconEl = document.getElementById("agent-rank-icon");
    if (rankIconEl) {
      rankIconEl.textContent = currentRank.icon;
    }

    // Päivitä agenttikoodi (näytä käyttäjänimi)
    const codeEl = document.getElementById("agent-code");
    if (codeEl) {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem('user'));
      } catch (e) {}
      if (user && user.username) {
        codeEl.textContent = user.username;
      } else if (user && user.email) {
        codeEl.textContent = user.email.split('@')[0];
      } else {
        codeEl.textContent = 'XXXXXXX';
      }
    }

    // Päivitä header väri
    const headerEl = document.querySelector(".agent-panel__header");
    if (headerEl && currentRank.color) {
      headerEl.style.background = currentRank.color;
    }

    // Päivitä seuraava arvo ja progress bar
    const nextRankEl = document.getElementById("agent-next-rank");
    const nextProgressEl = document.getElementById("agent-next-progress");
    const nextRankSection = document.querySelector(".agent-panel__next-rank");
    const nextPointsEl = document.getElementById("agent-next-points");

    if (nextRank) {
      if (nextRankEl) {
        nextRankEl.textContent = nextRank.name;
      }
      if (nextProgressEl) {
        const pointsNeeded = nextRank.minPoints - currentRank.minPoints;
        const pointsEarned = points - currentRank.minPoints;
        const progressPercent = Math.min(100, (pointsEarned / pointsNeeded) * 100);
        nextProgressEl.style.width = `${progressPercent}%`;
      }
      if (nextRankSection) {
        nextRankSection.style.display = "";
      }

      // Päivitä "pistettä puuttuu" teksti
      if (nextPointsEl) {
        const pointsNeeded = nextRank.minPoints - points;
        nextPointsEl.textContent = `${pointsNeeded} pistettä puuttuu`;
      }
    } else {
      // Maksimiarvo saavutettu
      if (nextRankSection) {
        nextRankSection.style.display = "none";
      }
    }
  }

  // Save the original agent panel HTML for restoration
  let originalAgentPanelHTML = null;
  function setupIndexPage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLogoutBtn = document.getElementById('loginLogoutBtn');
    const loginLogoutText = document.getElementById('loginLogoutText');
    const loginLogoutIcon = document.getElementById('loginLogoutIcon');
    if (loginLogoutBtn && loginLogoutText && loginLogoutIcon) {
      if (isLoggedIn) {
        loginLogoutText.textContent = 'Kirjaudu ulos';
        loginLogoutIcon.textContent = '➜';
        loginLogoutBtn.href = '#';
        loginLogoutBtn.onclick = function(e) {
          e.preventDefault();
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          setTimeout(() => { location.reload(); }, 100);
        };
      } else {
        loginLogoutText.textContent = 'Kirjaudu sisään / rekisteröidy';
        loginLogoutIcon.textContent = '➜';
        loginLogoutBtn.href = 'login.html';
        loginLogoutBtn.onclick = null;
      }
    }
    const agentPanel = document.querySelector('.agent-panel');
    if (agentPanel && originalAgentPanelHTML === null) {
      originalAgentPanelHTML = agentPanel.innerHTML;
    }
    console.log('[DEBUG] isLoggedIn:', isLoggedIn, '| user:', localStorage.getItem('user'));
   
    if (agentPanel) {
      if (isLoggedIn) {
        
        if (originalAgentPanelHTML && agentPanel.innerHTML !== originalAgentPanelHTML) {
          agentPanel.innerHTML = originalAgentPanelHTML;
        }
        agentPanel.style.display = '';
        updateAgentPanel();
      } else {
        // piilota agenttipaneeli jos ei ole kirjautunut
        agentPanel.style.display = 'none';
      }
    }
    if (isLoggedIn && agentPanel && agentPanel.style.display === 'none') {
      if (originalAgentPanelHTML && agentPanel.innerHTML !== originalAgentPanelHTML) {
        agentPanel.innerHTML = originalAgentPanelHTML;
      }
      agentPanel.style.display = '';
      updateAgentPanel();
    }
    const gameList = document.querySelector(".game-list");
    if (!gameList) return;
    if (isLoggedIn) {
      updateAgentPanel();
    }
    const state = loadState();
    const completed = new Set(state.completed);
    const cards = Array.from(gameList.querySelectorAll(".game-card"));
    cards.forEach((card, index) => {
      const missionId = card.dataset.missionId || `mission${index + 1}`;
      const prevMissionId = index === 0 ? null : (cards[index - 1].dataset.missionId || `mission${index}`);
      const isFirst = index === 0;
      const isUnlocked = isFirst || (prevMissionId && completed.has(prevMissionId));
      const lockIcon = card.querySelector(".game-card__lock");
      if (isUnlocked) {
        card.classList.add("game-card--active");
        card.classList.remove("game-card--locked");
        card.style.opacity = "1";
        if (lockIcon) {
          lockIcon.style.display = "none";
        }
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
  }

  // Tätä kutsutaan mission-sivuilta, kun pelaaja on suorittanut mission.
  // Esim: completeMission("mission1");
  function completeMission(missionId, redirectUrl = "index.html") {
    markMissionCompleted(missionId);
    window.location.href = redirectUrl;
  }

  // Viedään globaaliksi, jotta mission-sivut voivat käyttää
  window.completeMission = completeMission;

  document.addEventListener("DOMContentLoaded", setupIndexPage);
})();
