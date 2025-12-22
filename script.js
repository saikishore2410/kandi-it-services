// Mobile nav toggle
const toggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobile-nav');
if(toggle){
  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if(mobileNav){
      mobileNav.hidden = !mobileNav.hidden;
    }
  });
}

// Simple form handlers (client-side only)
document.getElementById('contactForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const status = document.getElementById('formStatus');
  if(status) status.textContent = 'Thanks — your message was sent (demo).';
  this.reset();
});

document.getElementById('estimateForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thanks! We will email you an initial estimate. (demo)');
  this.reset();
});
