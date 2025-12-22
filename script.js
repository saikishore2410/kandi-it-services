// Mobile nav toggle
const toggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobile-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (mobileNav) {
      mobileNav.hidden = !mobileNav.hidden;
    }
  });
}

// Session management + UI
function formatDuration(ms) {
  const total = Math.floor(ms / 1000);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return (hrs ? hrs + 'h ' : '') + (mins ? mins + 'm ' : '') + secs + 's';
}

try {
  const sessionEl = document.getElementById('sessionInfo');
  if (sessionEl) {
    let sessionStart = sessionStorage.getItem('sessionStart');
    if (!sessionStart) {
      sessionStart = Date.now().toString();
      sessionStorage.setItem('sessionStart', sessionStart);
    }
    let visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    visitCount = isNaN(visitCount) ? 1 : visitCount + 1;
    localStorage.setItem('visitCount', String(visitCount));

    function updateSession() {
      const start = parseInt(sessionStorage.getItem('sessionStart') || sessionStart, 10);
      const duration = Date.now() - start;
      sessionEl.textContent = `Session: ${formatDuration(duration)} · Visits: ${visitCount}`;
    }

    // update live every second
    updateSession();
    setInterval(updateSession, 1000);

    // update last activity (keeps session alive for analytics)
    const touch = () => sessionStorage.setItem('lastActivity', Date.now().toString());
    ['click', 'mousemove', 'keydown', 'touchstart'].forEach(ev => window.addEventListener(ev, touch, { passive: true }));
  }
} catch (err) {
  // avoid breaking the page if storage is blocked
  console.warn('Session UI error', err);
}

// Improved form handlers (client-side only)
function showStatus(el, msg, success = true) {
  if (!el) return;
  el.textContent = msg;
  el.style.color = success ? '' : 'crimson';
}

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  try {
    const status = document.getElementById('formStatus');
    const name = this.querySelector('#name')?.value?.trim();
    const email = this.querySelector('#email')?.value?.trim();
    const message = this.querySelector('#message')?.value?.trim();
    if (!name || !email || !message) {
      showStatus(status, 'Please complete all required fields.', false);
      return;
    }
    // simulate async send (demo)
    showStatus(status, 'Sending…');
    setTimeout(() => {
      showStatus(status, 'Thanks — your message was sent (demo).');
      this.reset();
    }, 700);
  } catch (err) {
    console.error(err);
  }
});

document.getElementById('estimateForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  try {
    const status = document.getElementById('estimateStatus');
    const name = this.querySelector('#ename')?.value?.trim();
    const email = this.querySelector('#eemail')?.value?.trim();
    if (!name || !email) {
      showStatus(status, 'Please enter your name and email to request an estimate.', false);
      return;
    }
    showStatus(status, 'Preparing estimate…');
    // pseudo-send and save a small record locally (demo)
    setTimeout(() => {
      const estimates = JSON.parse(localStorage.getItem('estimates') || '[]');
      estimates.push({ name, email, type: this.querySelector('#etype')?.value || '', at: Date.now() });
      localStorage.setItem('estimates', JSON.stringify(estimates));
      showStatus(status, 'Thanks! We will email you an initial estimate. (demo)');
      this.reset();
    }, 700);
  } catch (err) {
    console.error(err);
  }
});

// small accessibility helper: allow Enter to toggle mobile nav when focused
document.getElementById('mobileToggle')?.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});
