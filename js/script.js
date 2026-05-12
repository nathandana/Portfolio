document.addEventListener('DOMContentLoaded', () => {
    const settingsMenu = document.getElementById('settingsMenu');
    const settingsIcon = document.getElementById('settingsIcon');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const contrastSwitch = document.getElementById('contrastSwitch');
    const dyslexicSwitch = document.getElementById('dyslexicSwitch');
    const darkButtons = document.querySelectorAll('#darkToggle button');
  
    // Restore settings from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') || 'auto';
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    const savedDyslexic = localStorage.getItem('dyslexic') === 'true';
  
    // Toggle Menu
    settingsIcon.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click
      settingsMenu.classList.toggle('open');
    });
  
    document.addEventListener('click', (e) => {
      if (!settingsMenu.contains(e.target) && !settingsIcon.contains(e.target)) {
        settingsMenu.classList.remove('open');
      }
    });
  
    // Dark Mode
    let userDarkMode = savedDarkMode;
  
    function applyDarkMode(mode) {
      document.body.classList.remove('dark');
      if (mode === 'on') {
        document.body.classList.add('dark');
      } else if (mode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.body.classList.add('dark');
      }
      localStorage.setItem('darkMode', mode);
    }
  
    darkButtons.forEach(button => {
      if (button.dataset.value === userDarkMode) button.classList.add('active');
      button.addEventListener('click', () => {
        darkButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        userDarkMode = button.dataset.value;
        applyDarkMode(userDarkMode);
      });
    });
  
    applyDarkMode(userDarkMode);
  
    // High Contrast
    if (contrastSwitch) {
      contrastSwitch.checked = savedContrast;
      document.body.classList.toggle('high-contrast', savedContrast);
      contrastSwitch.addEventListener('change', e => {
        document.body.classList.toggle('high-contrast', e.target.checked);
        localStorage.setItem('highContrast', e.target.checked);
      });
    }
  
    // Dyslexic Mode
    if (dyslexicSwitch) {
      dyslexicSwitch.checked = savedDyslexic;
      document.body.classList.toggle('dyslexic', savedDyslexic);
      dyslexicSwitch.addEventListener('change', e => {
        document.body.classList.toggle('dyslexic', e.target.checked);
        localStorage.setItem('dyslexic', e.target.checked);
      });
    }
  
    // Reset to Default Settings
    if (resetSettingsBtn) {
      resetSettingsBtn.addEventListener('click', () => {
        // Clear localStorage
        localStorage.removeItem('darkMode');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('dyslexic');
  
        // Reset visual states
        document.body.classList.remove('dark', 'high-contrast', 'dyslexic');
  
        // Dark mode reset to 'auto'
        darkButtons.forEach(btn => btn.classList.remove('active'));
        const autoBtn = document.querySelector('#darkToggle button[data-value="auto"]');
        if (autoBtn) autoBtn.classList.add('active');
  
        // Uncheck switches
        if (contrastSwitch) contrastSwitch.checked = false;
        if (dyslexicSwitch) dyslexicSwitch.checked = false;
  
        // Reapply system dark mode if preferred
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.body.classList.add('dark');
        }
      });
    }
  
    // Platform detection
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      document.body.classList.add('ios');
    } else if (/android/.test(ua)) {
      document.body.classList.add('android');
    }
  });
  

  function logout() {
    localStorage.removeItem("siteAccess");
    window.location.href = "index.html";
  }


  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // e.g. 'home.html'
    const navLinks = document.querySelectorAll('ul.bigmenu a');
  
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('current-page');
      }
    });
  });


