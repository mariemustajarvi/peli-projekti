
// Käyttää localStoragea (myöhemmin voidaan vaihtaa Firebaseen).

(function () {
  const STORAGE_KEY = "kyberagentti_progress_v1";

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

  function setupIndexPage() {
    const gameList = document.querySelector(".game-list");
    if (!gameList) return; // ei olla index-sivulla

    const state = loadState();
    const completed = new Set(state.completed);

    const cards = Array.from(gameList.querySelectorAll(".game-card"));

    // Käydään kortit läpi järjestyksessä: 1. kortti = mission1, 2. = mission2...
    cards.forEach((card, index) => {
      const missionId = card.dataset.missionId || `mission${index + 1}`;
      const prevMissionId =
        index === 0 ? null : (cards[index - 1].dataset.missionId || `mission${index}`);

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
