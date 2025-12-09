// saavutettavuus asetukset
// korkea kontrasti tila

(function() {
  'use strict';

  // Korkean kontrastin tilan toiminnallisuus
  function initHighContrastToggle() {
    const contrastToggle = document.getElementById('contrastToggle');
    if (!contrastToggle) return;

    const body = document.body;

    // Nollaa korkean kontrastin tila sivun latauksessa (ei tallenneta)
    body.classList.remove('high-contrast');
    localStorage.removeItem('high_contrast_mode');

    // eventti kuuntelija
    contrastToggle.addEventListener('click', function() {
      body.classList.toggle('high-contrast');
      const isHighContrast = body.classList.contains('high-contrast');

      // buttoni tekstit
      if (isHighContrast) {
        contrastToggle.setAttribute('aria-label', 'Vaihda takaisin normaaliin tilaan');
        contrastToggle.setAttribute('title', 'Vaihda takaisin normaaliin tilaan');
      } else {
        contrastToggle.setAttribute('aria-label', 'Vaihda korkean kontrastin tilaan');
        contrastToggle.setAttribute('title', 'Vaihda korkean kontrastin tilaan');
      }
    });
  }

  // ESC-näppäin palaa takaisin etusivulle
  function initEscapeKey() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // Tarkista popup auki jos ei, palaa index.html
        const hasModal = document.querySelector('.modal:not([aria-hidden="true"])') || 
                         document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
        
        if (!hasModal) {
          window.location.href = 'index.html';
        }
      }
    });
  }

  // Alusta kun valmis
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initHighContrastToggle();
      initEscapeKey();
    });
  } else {
    initHighContrastToggle();
    initEscapeKey();
  }
})();
