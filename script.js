// ── Clock ──
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const time = `${h}:${m}`;
  const clockEl = document.getElementById('clock');
  const macClock = document.getElementById('macClock');
  if (clockEl) clockEl.textContent = time;
  if (macClock) macClock.textContent = time;
}
updateClock();
setInterval(updateClock, 10000);

// ── Start Menu toggle ──
const startBtn   = document.getElementById('startBtn');
const startMenu  = document.getElementById('startMenu');
startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startMenu.classList.toggle('open');
});
document.addEventListener('click', () => startMenu.classList.remove('open'));
startMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => startMenu.classList.remove('open'));
});

// ── Scroll → OS theme switching ──
const sections = ['home','about','skill','works','contact'];
const osThemes = {
  home:    '',
  about:   'xp',
  skill:   'win7',
  works:   'win10',
  contact: 'macos',
};
const taskbar = document.getElementById('taskbar');
const taskbarItems = document.querySelectorAll('.taskbar-item');

function getActiveSection() {
  let current = 'home';
  const offset = window.innerHeight * 0.4;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= offset) current = id;
  });
  return current;
}

function applyTheme(sectionId) {
  const theme = osThemes[sectionId] || '';
  taskbar.className = 'taskbar' + (theme ? ' ' + theme : '');
  taskbarItems.forEach(item => {
    item.classList.toggle('active', item.dataset.target === sectionId);
  });
}

window.addEventListener('scroll', () => {
  const active = getActiveSection();
  applyTheme(active);
}, { passive: true });

// ── Taskbar item click → scroll ──
taskbarItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Desktop icon click (Win95) ──
window.scrollTo95 = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ── Skill bar animation on scroll ──
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width; // trigger reflow
    }
  });
}, { threshold: 0.2 });
skillFills.forEach(el => skillObserver.observe(el));

// ── macOS notification dismiss ──
const notif = document.getElementById('macNotif');
if (notif) {
  notif.querySelector('.notif-btn.primary')?.addEventListener('click', () => {
    notif.style.display = 'none';
  });
}

// ── Init ──
applyTheme('home');
