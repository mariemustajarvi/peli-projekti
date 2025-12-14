import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getDatabase, ref, onValue, update } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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

// Saavutukset määritelty järjestyksessä
const ACHIEVEMENTS = [
  // Missioiden saavutukset (10 kpl) - vain suoritus vaaditaan
  { id: 'mission0_perfect', title: 'Salasanamestari', points: 50, check: (data) => data.completedMissions[0] === true },
  { id: 'mission1_perfect', title: 'Tietojenkalastelun tarkkailija', points: 50, check: (data) => data.completedMissions[1] === true },
  { id: 'mission2_perfect', title: 'Manipulaation pysäyttäjä', points: 50, check: (data) => data.completedMissions[2] === true },
  { id: 'mission3_perfect', title: 'Turvallinen surffaaja', points: 50, check: (data) => data.completedMissions[3] === true },
  { id: 'mission4_perfect', title: 'Tietosuojaoperaation ekspertti', points: 50, check: (data) => data.completedMissions[4] === true },
  { id: 'mission5_perfect', title: 'Käytäntöjen lajittelija', points: 50, check: (data) => data.completedMissions[5] === true },
  { id: 'mission6_perfect', title: 'Käsitteiden mestari', points: 50, check: (data) => data.completedMissions[6] === true },
  { id: 'mission7_perfect', title: 'Uhka-analyytikko', points: 50, check: (data) => data.completedMissions[7] === true },
  { id: 'mission8_perfect', title: 'Totta vai tarua -murtaja', points: 50, check: (data) => data.completedMissions[8] === true },
  { id: 'mission9_perfect', title: 'Arvioinnin arkkitehti', points: 50, check: (data) => data.completedMissions[9] === true },

  // Erikoissaavutukset (15 kpl)
  { id: 'first_mission', title: 'Ensiaskeleet agenttina', points: 25, check: (data) => data.completedMissions.filter(m => m).length >= 1 },
  { id: 'three_missions', title: 'Vauhtiin pääsijä', points: 35, check: (data) => data.completedMissions.filter(m => m).length >= 3 },
  { id: 'five_missions', title: 'Puolivälissä', points: 50, check: (data) => data.completedMissions.filter(m => m).length >= 5 },
  { id: 'all_missions', title: 'Monipuolinen agentti', points: 100, check: (data) => data.completedMissions.filter(m => m).length >= 10 },
  {
    id: 'first_perfect', title: 'Ensimmäinen täydellinen', points: 50, check: (data) => {
      const maxScores = [100, 150, 150, 200, 200, 200, 100, 150, 100, 400];
      return data.scores.some((score, i) => score >= maxScores[i]);
    }
  },
  {
    id: 'five_perfect', title: 'Mestarikandidaatti', points: 150, check: (data) => {
      const maxScores = [100, 150, 150, 200, 200, 200, 100, 150, 100, 400];
      return data.scores.filter((score, i) => score >= maxScores[i]).length >= 5;
    }
  },
  {
    id: 'points_100', title: 'Satasten kerho', points: 25, check: (data) => {
      const total = data.scores.reduce((sum, s) => sum + s, 0);
      return total >= 100;
    }
  },
  {
    id: 'points_500', title: 'Kybersistentti sotilas', points: 75, check: (data) => {
      const total = data.scores.reduce((sum, s) => sum + s, 0);
      return total >= 500;
    }
  },
  {
    id: 'points_1000', title: 'Kybermestari', points: 150, check: (data) => {
      const total = data.scores.reduce((sum, s) => sum + s, 0);
      return total >= 1000;
    }
  },
  {
    id: 'points_1500', title: 'Legendaarinen agentti', points: 200, check: (data) => {
      const total = data.scores.reduce((sum, s) => sum + s, 0);
      return total >= 1500;
    }
  },
  {
    id: 'speed_master', title: 'Nopeuden mestari', points: 50, check: (data) => {
      // Missions 8 and 9 are time challenges
      return data.completedMissions[8] && data.completedMissions[9];
    }
  },
  {
    id: 'threat_detector', title: 'Uhkien havaitsija', points: 50, check: (data) => {
      return data.completedMissions[1] && data.completedMissions[2];
    }
  },
  {
    id: 'privacy_advocate', title: 'Yksityisyyden puolestapuhuja', points: 50, check: (data) => {
      return data.completedMissions[4] && data.completedMissions[3];
    }
  },
  {
    id: 'perfect_streak', title: 'Täydellisyyden sarja', points: 100, check: (data) => {
      const maxScores = [100, 150, 150, 200, 200, 200, 100, 150, 100, 400];
      let streak = 0;
      let maxStreak = 0;
      for (let i = 0; i < data.scores.length; i++) {
        if (data.scores[i] >= maxScores[i]) {
          streak++;
          maxStreak = Math.max(maxStreak, streak);
        } else {
          streak = 0;
        }
      }
      return maxStreak >= 3;
    }
  },
  {
    id: 'ultimate_master', title: 'Kyberagentti: ultimaattinen mestari', points: 250, check: (data) => {
      const maxScores = [100, 150, 150, 200, 200, 200, 100, 150, 100, 400];
      return data.scores.every((score, i) => score >= maxScores[i]);
    }
  }
];

// laske saavutuspisteet ja lukumäärä
window.getAchievementStats = function (achievements) {
  if (!achievements) return { points: 0, count: 0 };

  const achievementPoints = {
    'mission0_perfect': 50, 'mission1_perfect': 50, 'mission2_perfect': 50,
    'mission3_perfect': 50, 'mission4_perfect': 50, 'mission5_perfect': 50,
    'mission6_perfect': 50, 'mission7_perfect': 50, 'mission8_perfect': 50,
    'mission9_perfect': 50, 'first_mission': 25, 'three_missions': 35,
    'five_missions': 50, 'all_missions': 100, 'first_perfect': 50,
    'five_perfect': 150, 'points_100': 25, 'points_500': 75,
    'points_1000': 150, 'points_1500': 200, 'speed_master': 50,
    'threat_detector': 50, 'privacy_advocate': 50, 'perfect_streak': 100,
    'ultimate_master': 250
  };

  let totalPoints = 0;
  let count = 0;

  for (const [key, value] of Object.entries(achievements)) {
    if (value === true && achievementPoints[key]) {
      totalPoints += achievementPoints[key];
      count++;
    }
  }

  return { points: totalPoints, count: count };
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const userRef = ref(db, 'users/' + userId);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Initialize achievements if not exists
        if (!data.achievements) {
          const updates = {};
          updates['achievements'] = {};
          update(userRef, updates);
        }

        const userAchievements = data.achievements || {};
        const newAchievements = {};
        let totalPoints = 0;
        let unlockedCount = 0;

        // Check all achievements
        ACHIEVEMENTS.forEach((achievement, index) => {
          const isUnlocked = achievement.check(data);

          if (isUnlocked && !userAchievements[achievement.id]) {
            newAchievements[`achievements/${achievement.id}`] = true;
          }

          if (isUnlocked || userAchievements[achievement.id]) {
            totalPoints += achievement.points;
            unlockedCount++;
          }
        });

        // Update database with new achievements
        if (Object.keys(newAchievements).length > 0) {
          update(userRef, newAchievements);
        }

        // Update UI
        updateAchievementsUI(data, userAchievements, totalPoints, unlockedCount);
      }
    });
  } else {
    if (window.location.pathname == '/saavutukset.html') {
      window.location.href = "login.html";
    }
  }
});

function updateAchievementsUI(data, userAchievements, totalPoints, unlockedCount) {
  // Update header
  const subtitle = document.querySelector('.ach-header-subtitle');
  if (subtitle) {
    subtitle.textContent = `AVATTU ${unlockedCount} / ${ACHIEVEMENTS.length}`;
  }

  const pointsBtn = document.querySelector('.ach-header-points');
  if (pointsBtn) {
    pointsBtn.textContent = `✧ ${totalPoints} pistettä saavutuksista`;
  }

  // Update achievement cards
  const cards = document.querySelectorAll('.ach-card');
  cards.forEach((card, index) => {
    const achievement = ACHIEVEMENTS[index];
    if (achievement) {
      const isUnlocked = achievement.check(data) || userAchievements[achievement.id];

      if (isUnlocked) {
        card.classList.remove('ach-card--locked');
        card.classList.add('ach-card--unlocked');
      } else {
        card.classList.add('ach-card--locked');
        card.classList.remove('ach-card--unlocked');
      }
    }
  });
}
