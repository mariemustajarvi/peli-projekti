// Accessibility features - Reusable across all levels
// High contrast mode toggle with localStorage persistence

(function() {
  'use strict';

  // High contrast toggle functionality
  function initHighContrastToggle() {
    const contrastToggle = document.getElementById('contrastToggle');
    if (!contrastToggle) return;

    const body = document.body;

    // Reset high contrast mode on page load (don't persist)
    body.classList.remove('high-contrast');
    localStorage.removeItem('high_contrast_mode');

    // Toggle event listener
    contrastToggle.addEventListener('click', function() {
      body.classList.toggle('high-contrast');
      const isHighContrast = body.classList.contains('high-contrast');

      // Update button labels
      if (isHighContrast) {
        contrastToggle.setAttribute('aria-label', 'Vaihda takaisin normaaliin tilaan');
        contrastToggle.setAttribute('title', 'Vaihda takaisin normaaliin tilaan');
      } else {
        contrastToggle.setAttribute('aria-label', 'Vaihda korkean kontrastin tilaan');
        contrastToggle.setAttribute('title', 'Vaihda korkean kontrastin tilaan');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighContrastToggle);
  } else {
    initHighContrastToggle();
  }
})();
