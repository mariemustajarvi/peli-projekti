// ================================
// VÄLIAIKAINEN LOKAALI REKISTERÖINTI TESTAUSTA VARTEN
// KORVAA TÄMÄ FIREBASELLA KUN OLET VALMIS
// ================================

// korkea kontrasti toggle asetus
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

// Rekisteröintilomakkeen lähetys
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Tarkista että salasanat täsmäävät
    if (password !== confirmPassword) {
      alert('Salasanat eivät täsmää!');
      return;
    }
    
    // Tarkista salasanan vahvuus 
    if (password.length < 8) {
      alert('Salasanan tulee olla vähintään 8 merkkiä pitkä!');
      return;
    }
    
    // Tyhjennä kaikki vanhat käyttäjätiedot ensin (väliaikainen)
    localStorage.removeItem('user_points');
    localStorage.removeItem('completedLevels');
    localStorage.removeItem('achievements');
    
    // Tallenna kaikki käyttäjät localStorageen (väliaikainen, korvaa Firebaseen)
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      alert('Sähköposti on jo rekisteröity!');
      return;
    }
    const userData = {
      username: username,
      email: email,
      password: password, // HUOM! ÄLÄ KOSKAAN SÄILYTÄ NÄIN OIKEASSA SOVELLUKSESSA
      registeredAt: new Date().toISOString()
    };
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    // Kirjaa sisään automaattisesti rekisteröinnin jälkeen
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    setTimeout(() => {
      alert('Tervetuloa, agentti ' + username + '!');
      window.location.replace('index.html');
    }, 100);
  });
}

// Google rekisteröitymisnappi
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    console.log('Google registration clicked');
    alert('Google-kirjautuminen tulossa pian! (Demo)');
  });
}

// Facebook rekisteröitymisnappi
const facebookBtn = document.getElementById('facebookBtn');
if (facebookBtn) {
  facebookBtn.addEventListener('click', () => {
    console.log('Facebook registration clicked');
    alert('Facebook-kirjautuminen tulossa pian! (Demo)');
  });
}
