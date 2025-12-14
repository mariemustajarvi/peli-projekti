import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
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
const auth = getAuth(app);
const database = getDatabase(app);

let currentUserId = null;

// Hae agentin arvo pisteiden perusteella
function getAgentRank(totalPoints) {
  if (totalPoints >= 3500) return { name: 'Elite-Agentti', icon: '🏅' };
  if (totalPoints >= 2500) return { name: 'Veteraani-Agentti', icon: '⭐' };
  if (totalPoints >= 1500) return { name: 'Kenttäagentti', icon: '🎯' };
  if (totalPoints >= 500) return { name: 'Agentti', icon: '🔷' };
  return { name: 'Aloittelija-Agentti', icon: '🔰' };
}

// Laske käyttäjän kokonaispisteet
function calculateTotalPoints(userData) {
  const scores = userData.scores || [];
  const missionPoints = scores.reduce((sum, score) => sum + (score || 0), 0);
  
  // Käytä samaa saavutusten laskentaa kuin pääsivulla
  const achievementStats = typeof window.getAchievementStats === 'function' 
    ? window.getAchievementStats(userData.achievements)
    : { points: 0, count: 0 };
  
  return missionPoints + achievementStats.points;
}

// Laske suoritetut missiot
function countCompletedMissions(userData) {
  return (userData.completedMissions || []).length;
}

// Laske avatut saavutukset
function countAchievements(userData) {
  const achievements = userData.achievements || {};
  return Object.values(achievements).filter(val => val === true).length;
}

// Lataa ja näytä tulostaulukko
function loadLeaderboard() {
  const loadingState = document.getElementById('loadingState');
  const leaderboardContainer = document.getElementById('leaderboardContainer');
  const emptyState = document.getElementById('emptyState');
  
  loadingState.style.display = 'block';
  leaderboardContainer.style.display = 'none';
  emptyState.style.display = 'none';
  
  const usersRef = ref(database, 'users');
  
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    
    if (!data) {
      loadingState.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }
    
    // Muunna taulukoksi ja laske tilastot
    const players = [];
    Object.keys(data).forEach(userId => {
      const userData = data[userId];
      const totalPoints = calculateTotalPoints(userData);
      const missionsCompleted = countCompletedMissions(userData);
      const achievementsUnlocked = countAchievements(userData);
      
      // Laske suoritetut tasot (olettaen 10 tasoa per missio)
      const scores = userData.scores || [];
      const levelsCompleted = scores.filter(score => score > 0).length;
      
      players.push({
        userId,
        username: userData.username || 'Tuntematon',
        totalPoints,
        missionsCompleted,
        levelsCompleted,
        achievementsUnlocked,
        rank: getAgentRank(totalPoints)
      });
    });
    
    // Järjestä pisteiden mukaan (laskevasti)
    players.sort((a, b) => b.totalPoints - a.totalPoints);
    
    // Näytä tulostaulukko
    leaderboardContainer.innerHTML = '';
    
    players.forEach((player, index) => {
      const rankNum = index + 1;
      const isCurrentUser = player.userId === currentUserId;
      
      const itemDiv = document.createElement('div');
      itemDiv.className = `leaderboard-item ${isCurrentUser ? 'current-user' : ''}`;
      
      // Määritä sijoitusmerkin luokka
      let rankBadgeClass = 'rank-badge';
      if (rankNum === 1) rankBadgeClass += ' top-1';
      else if (rankNum === 2) rankBadgeClass += ' top-2';
      else if (rankNum === 3) rankBadgeClass += ' top-3';
      
      itemDiv.innerHTML = `
        <div class="${rankBadgeClass}">
          #${rankNum}
        </div>
        <div class="player-info">
          <div class="player-name">${player.username}</div>
          <div class="player-rank">
            <span class="rank-icon">${player.rank.icon}</span>
            <span>${player.rank.name}</span>
          </div>
          <div class="player-stats">
            <div class="stat-item">
              <span class="stat-icon">🎯</span>
              <span>${player.missionsCompleted} missiota</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">⭐</span>
              <span>${player.levelsCompleted} tasolla</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">🏆</span>
              <span>${player.achievementsUnlocked} saavutusta</span>
            </div>
          </div>
        </div>
        <div class="total-points">
          <div class="points-value">${player.totalPoints}</div>
          <div class="points-label">operaatiopistettä</div>
        </div>
      `;
      
      leaderboardContainer.appendChild(itemDiv);
      
      // Päivitä käyttäjän sijoitus ja vieritä nykyiseen käyttäjään
      if (isCurrentUser) {
        const userRanking = document.getElementById('userRanking');
        userRanking.textContent = `Agenttisijoitus: #${rankNum}`;
        
        // Vieritä nykyisen käyttäjän kohtaan lyhyen viiveen jälkeen
        setTimeout(() => {
          itemDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    });
    
    loadingState.style.display = 'none';
    leaderboardContainer.style.display = 'flex';
  }, (error) => {
    console.error('Error loading leaderboard:', error);
    loadingState.style.display = 'none';
    emptyState.style.display = 'block';
  });
}

// Alusta
document.addEventListener('DOMContentLoaded', () => {
  // Tarkista kirjautuminen
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId = user.uid;
      loadLeaderboard();
    } else {
      // Ei kirjautuneena, ohjaa kirjautumissivulle
      window.location.href = 'login.html';
    }
  });
  
  // Takaisin-painike
  const backBtn = document.getElementById('backBtn');
  backBtn.addEventListener('click', () => {
    window.location.href = 'mainframe.html';
  });
  
  // Päivitä-painike
  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn.addEventListener('click', () => {
    loadLeaderboard();
  });
});
