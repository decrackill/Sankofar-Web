/* =========================================================
   Fundación Cultural Sankofa — interacción
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- año dinámico en el copyright ---- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- header con fondo al hacer scroll ---- */
  const header = document.getElementById('siteHeader');
  const toggleHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });

  /* ---- barra de progreso de lectura ---- */
  const progressBar = document.getElementById('progressBar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${docHeight > 0 ? scrollTop / docHeight : 0})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* ---- menú móvil ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navQuery = window.matchMedia('(max-width: 959px)');
  let menuOpen = false;

  const setMenu = (open, { returnFocus = false } = {}) => {
    menuOpen = open;
    mainNav.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('nav-open', open);

    if (navQuery.matches) {
      if (open) {
        mainNav.removeAttribute('inert');
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      } else {
        mainNav.setAttribute('inert', '');
      }
    } else {
      mainNav.removeAttribute('inert');
    }

    if (returnFocus) navToggle.focus({ preventScroll: true });
  };

  const syncMenuWithViewport = () => {
    if (!navQuery.matches && menuOpen) {
      setMenu(false);
      return;
    }
    if (navQuery.matches && !menuOpen) {
      mainNav.setAttribute('inert', '');
    } else {
      mainNav.removeAttribute('inert');
    }
  };

  syncMenuWithViewport();

  navToggle.addEventListener('click', () => {
    setMenu(!menuOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      setMenu(false, { returnFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (!menuOpen || !navQuery.matches) return;
    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      setMenu(false);
    }
  });

  if (typeof navQuery.addEventListener === 'function') {
    navQuery.addEventListener('change', syncMenuWithViewport);
  } else {
    navQuery.addListener(syncMenuWithViewport);
  }

  /* ---- botón volver arriba ---- */
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 600);
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- aparición al hacer scroll ---- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 3) * 90}ms`;
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- resaltar enlace de navegación según sección visible ---- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

});