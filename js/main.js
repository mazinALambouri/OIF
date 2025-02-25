// Make switchTab function global
window.switchTab = function(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
    tab.classList.remove('block');
  });
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('block');

  // Update button states
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('bg-indigo-600', 'text-white');
    button.classList.add('bg-gray-200', 'text-gray-700');
  });
  event.currentTarget.classList.remove('bg-gray-200', 'text-gray-700');
  event.currentTarget.classList.add('bg-indigo-600', 'text-white');
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize first tab
  switchTab('day1');

  // Get all sections and navigation links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'text-purple-600', 'text-indigo-600', 'text-green-600');
        });

        // Add active class to corresponding links
        document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
          switch(sectionId) {
            case 'home':
              link.classList.add('text-blue-600');
              break;
            case 'schedule':
              link.classList.add('text-purple-600');
              break;
            case 'speakers':
              link.classList.add('text-indigo-600');
              break;
            case 'register':
              link.classList.add('text-green-600');
              break;
          }
        });
      }
    });
  };

  // Initial check on page load
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', () => {
    handleScroll();
  });

  // Mobile menu toggle functionality
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });

  // Registration form submission simulation
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      `;
      setTimeout(() => {
        button.innerHTML = `
          <svg class="w-6 h-6 text-white inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          Registration Complete!
        `;
        button.classList.add('bg-green-600');
        setTimeout(() => {
          registrationForm.reset();
          button.innerHTML = originalText;
          button.classList.remove('bg-green-600');
        }, 2000);
      }, 1500);
    });
  }

  // Update smooth scroll handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.querySelector(`#${targetId}`);
      
      if (targetElement) {
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update colors immediately
        handleScroll();
      }
    });
  });
}); 