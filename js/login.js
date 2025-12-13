// ================================
// VÄLIAIKAINEN LOKAALI KIRJAUTUMINEN TESTAUSTA VARTEN
// KORVAA TÄMÄ FIREBASELLA KUN OLET VALMIS
// ================================

// korkean kontrastin asetukset
const contrastToggle = document.getElementById('contrastToggle');
if (contrastToggle) {
  contrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    contrastToggle.setAttribute(
      'aria-label',
      isHighContrast ? 'Vaihda normaaliin tilaan' : 'Vaihda korkean kontrastin tilaan'
    );
  });
}

// Kirjautumislomakkeen lähetys
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Tarkista käyttäjät localStoragesta (väliaikainen, korvaa Firebaseen)
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Väärä sähköposti tai salasana!');
      return;
    }
    // Tyhjennä edistyminen, jos vaihdetaan käyttäjää (väliaikainen)
    const oldUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isDifferentUser = oldUser.email && oldUser.email !== email;
    if (isDifferentUser) {
      localStorage.removeItem('user_points');
      localStorage.removeItem('completedLevels');
      localStorage.removeItem('achievements');
    }
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    setTimeout(() => {
      alert('Tervetuloa takaisin, agentti ' + user.username + '!');
      window.location.replace('index.html');
    }, 100);
  });
}

// Google login buttoni
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    console.log('Google login clicked');
    alert('Google-kirjautuminen tulossa pian! (Demo)');
  });
}

// Facebook login buttoni
const facebookBtn = document.getElementById('facebookBtn');
if (facebookBtn) {
  facebookBtn.addEventListener('click', () => {
    console.log('Facebook login clicked');
    alert('Facebook-kirjautuminen tulossa pian! (Demo)');
  });
}
