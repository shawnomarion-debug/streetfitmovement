/* ═══════════════════════════════════════════════════════
   STREETFITMOVEMENT — app.js
═══════════════════════════════════════════════════════ */

/* ── NAV: scroll state + mobile toggle ─────────────── */
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ─────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── STAGGER CARDS ─────────────────────────────────── */
document.querySelectorAll('.testi-grid .testi-card, .pkg-grid .pkg-card, .why-grid .why-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

/* ── MEDIA TABS ────────────────────────────────────── */
document.querySelectorAll('.media-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update tabs
    document.querySelectorAll('.media-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels
    document.querySelectorAll('.media-panel').forEach(p => {
      p.classList.remove('active');
      p.hidden = true;
    });
    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      panel.hidden = false;
      // Force any deferred images in the newly shown panel to load immediately
      panel.querySelectorAll('img[loading="lazy"]').forEach(im => { im.loading = 'eager'; });
    }
  });
});

// Arrow-key navigation between media tabs (WAI-ARIA tabs pattern)
const mediaTabsList = Array.from(document.querySelectorAll('.media-tab'));
mediaTabsList.forEach((tab, i) => {
  tab.addEventListener('keydown', e => {
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % mediaTabsList.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + mediaTabsList.length) % mediaTabsList.length;
    else return;
    e.preventDefault();
    mediaTabsList[next].focus();
    mediaTabsList[next].click();
  });
});

/* ── YOUTUBE FACADE: load iframe only on click ─────── */
document.querySelectorAll('.video-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const wrap = facade.closest('.video-ph');
    const id = wrap && wrap.dataset.yt;
    if (!id) return;
    const title = facade.getAttribute('aria-label').replace('Play video: ', '');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = title;
    iframe.loading = 'lazy';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    wrap.innerHTML = '';
    wrap.appendChild(iframe);
  });
});

/* ── BMI CALCULATOR ────────────────────────────────── */
document.getElementById('bmiBtn').addEventListener('click', calcBMI);
// Also allow Enter key in inputs
document.querySelectorAll('#bmi-height, #bmi-weight, #bmi-age').forEach(inp => {
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') calcBMI(); });
});

function calcBMI() {
  const h = parseFloat(document.getElementById('bmi-height').value);
  const w = parseFloat(document.getElementById('bmi-weight').value);
  if (!h || !w || h < 100 || h > 250 || w < 20 || w > 300) {
    alert('Please enter a valid height (100–250 cm) and weight (20–300 kg).');
    return;
  }
  const bmi      = w / ((h / 100) ** 2);
  const bmiRound = Math.round(bmi * 10) / 10;

  let cat, tip;
  if (bmi < 18.5) {
    cat = 'Underweight';
    tip = "Your body needs more fuel. Shane's nutrition coaching can help you build lean mass with the right foods and training structure.";
  } else if (bmi < 25) {
    cat = 'Healthy Weight';
    tip = "Great foundation! Now is the perfect time to build strength, improve mobility, and elevate your performance with STREETFITMOVEMENT.";
  } else if (bmi < 30) {
    cat = 'Overweight';
    tip = "Totally manageable. Shane's combined dance + fitness training is proven to torch fat while keeping sessions genuinely fun and sustainable.";
  } else {
    cat = 'Obese';
    tip = "The first step is the hardest — and you just took it. Shane specialises in transformative programs that meet you exactly where you are.";
  }

  const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 4), 94);

  document.getElementById('bmi-num').textContent = bmiRound;
  document.getElementById('bmi-cat').textContent = cat;
  document.getElementById('bmi-tip').textContent = tip;

  const bar = document.getElementById('bmi-bar');
  bar.style.width = '0%';
  requestAnimationFrame(() => { bar.style.width = pct + '%'; });

  const result = document.getElementById('bmi-result');
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── FOOTER YEAR ───────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── LAZY LOAD IMAGES ──────────────────────────────── */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy load supported — no action needed (loading="lazy" on tags)
} else {
  // Fallback for older browsers
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImgs.forEach(img => imgObserver.observe(img));
}

/* ── CARD RAILS: 3 featured + "View all" (reusable) ── */
function initCardRails() {
  const FEATURED = 3;
  document.querySelectorAll('[data-rail]').forEach(rail => {
    const cards = Array.from(rail.children);
    if (cards.length <= FEATURED) return;            // nothing to collapse

    rail.setAttribute('data-expanded', 'false');
    cards.forEach((c, i) => { if (i >= FEATURED) c.classList.add('rail-extra'); });

    const label  = rail.getAttribute('data-rail-label') || 'items';
    const total  = cards.length;
    if (!rail.id) rail.id = 'rail-' + label;

    const controls = document.createElement('div');
    controls.className = 'rail-controls';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rail-toggle btn-ghost btn-sm';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', rail.id);

    const setLabel = (expanded) => {
      btn.textContent = expanded ? 'Show less ↑' : `View all ${total} ${label} →`;
    };
    setLabel(false);

    btn.addEventListener('click', () => {
      const expanded = rail.getAttribute('data-expanded') === 'true';
      const next = !expanded;
      rail.setAttribute('data-expanded', String(next));
      btn.setAttribute('aria-expanded', String(next));
      setLabel(next);
      if (next) {
        // reveal any cards that were hidden so they aren't stuck at opacity 0
        cards.forEach(c => c.classList.add('visible'));
      } else {
        rail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    controls.appendChild(btn);
    rail.insertAdjacentElement('afterend', controls);
  });
}
initCardRails();

/* ── SMOOTH ANCHOR OFFSET (accounts for fixed nav) ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
