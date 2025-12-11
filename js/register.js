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
    
    // Tyhjennä kaikki vanhat käyttäjätiedot ensin
    localStorage.removeItem('user_points');
    localStorage.removeItem('completedLevels');
    localStorage.removeItem('achievements');
    
    // Tallenna feikki käyttäjätiedot localStorageen testausta varten 
    const userData = {
      username: username,
      email: email,
      loggedIn: true,
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    console.log('Registration successful:', { username, email });
    
    // Siirry etusivulle
    alert('Tervetuloa, agentti ' + username + '!');
    window.location.href = 'index.html';
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
