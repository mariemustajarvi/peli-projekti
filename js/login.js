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
    
    // Luo feikki käyttäjänimi sähköpostista testausta varten
    const username = email.split('@')[0];
    
    // Tarkista onko kyseessä eri käyttäjä
    const oldUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isDifferentUser = oldUser.email && oldUser.email !== email;
    
    // Tyhjennä edistyminen, jos vaihdetaan käyttäjää
    if (isDifferentUser) {
      localStorage.removeItem('user_points');
      localStorage.removeItem('completedLevels');
      localStorage.removeItem('achievements');
    }
    
    // Tallenna feikki käyttäjätiedot localStorageen tastausta varten
    const userData = {
      username: username,
      email: email,
      loggedIn: true,
      loginAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    console.log('Login successful:', { email });
    
    // Siirry etusivulle
    alert('Tervetuloa takaisin, agentti ' + username + '!');
    window.location.href = 'index.html';
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
