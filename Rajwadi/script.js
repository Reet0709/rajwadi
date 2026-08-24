/* =========================================
   RAJWADI BOUTIQUE — Interactive Animations v3
   Premium Light Theme with Fun Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initHeroParticles();
  initHeroParallax();
  initHoopShowcase();
  initReelsCarousel();
  initReelsParticles();
  initScrollReveal();
  initRotatingWords();
  initMagneticButtons();
  initCardTilt();
  initSmoothScroll();
  initColourPalette();
  initSuitsShop();
  initServiceCards();
  initTestimonials();
  initTransformationSlider();
});

/* =========================================
   LOADING SCREEN
   ========================================= */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });

  document.body.style.overflow = 'hidden';

  // Fallback
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 4000);
}

/* =========================================
   CUSTOM CURSOR
   ========================================= */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = document.querySelectorAll('a, button, .craft-card, .svc-card, .nav-toggle, .magnetic, .tag');

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '0.4';
  });
}

/* =========================================
   NAVBAR
   ========================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', lastScrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* =========================================
   MOBILE MENU
   ========================================= */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* =========================================
   GOLDEN PARTICLE SYSTEM (Light Theme)
   ========================================= */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 0.8,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.3 - 0.05, // Gentle upward drift
      opacity: Math.random() * 0.4 + 0.1,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.004 + 0.001,
      hue: Math.random() > 0.5 ? 38 : 42, // Warm gold hues
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 15000), 60);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.opacity += p.opacityDir * p.opacitySpeed;
      if (p.opacity >= 0.5) p.opacityDir = -1;
      if (p.opacity <= 0.05) p.opacityDir = 1;

      // Wrap around
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Draw sparkle/diamond shape
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);

      // Main dot
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 60%, 55%, ${p.opacity})`;
      ctx.fill();

      // Soft glow
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 60%, 55%, ${p.opacity * 0.08})`;
      ctx.fill();

      // Tiny cross sparkle
      if (p.size > 2) {
        ctx.strokeStyle = `hsla(${p.hue}, 60%, 65%, ${p.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-p.size * 2, 0);
        ctx.lineTo(p.size * 2, 0);
        ctx.moveTo(0, -p.size * 2);
        ctx.lineTo(0, p.size * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
    animationId = requestAnimationFrame(draw);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) draw();
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0.1 });

  resize();
  initParticles();
  observer.observe(canvas.parentElement);
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
}

/* =========================================
   SCROLL REVEAL
   ========================================= */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

/* =========================================
   ROTATING WORDS (Fun interactive element)
   ========================================= */
function initRotatingWords() {
  const container = document.getElementById('rotating-words');
  if (!container) return;

  const words = container.querySelectorAll('.rotating-word');
  if (!words.length) return;

  let currentIndex = 0;
  const total = words.length;

  function rotateWord() {
    // Exit current word
    words[currentIndex].classList.remove('active');
    words[currentIndex].classList.add('exit');

    // Move to next
    currentIndex = (currentIndex + 1) % total;

    // Enter new word
    words[currentIndex].classList.remove('exit');
    words[currentIndex].classList.add('active');

    // Clean up exit class after transition
    setTimeout(() => {
      words.forEach((w, i) => {
        if (i !== currentIndex) {
          w.classList.remove('exit', 'active');
        }
      });
    }, 500);
  }

  setInterval(rotateWord, 2200);
}

/* =========================================
   MAGNETIC BUTTONS
   ========================================= */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic');
  if (!buttons.length || window.matchMedia('(hover: none)').matches) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.25;

      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease-out';
    });
  });
}

/* =========================================
   3D CARD TILT EFFECT
   ========================================= */
function initCardTilt() {
  const cards = document.querySelectorAll('.craft-card');
  if (!cards.length || window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease-out';
    });
  });
}

/* =========================================
   SMOOTH SCROLL
   ========================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const nav = document.getElementById('navbar');
      const navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH - 20,
        behavior: 'smooth'
      });
    });
  });
}

/* =========================================
   HERO INTERACTIVE MOUSE PARALLAX
   ========================================= */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const spotlight = document.getElementById('hero-spotlight');
  const silkThread = document.getElementById('silk-thread-path');
  const showcase = document.getElementById('hero-showcase');
  const accent1 = document.getElementById('accent-1');
  const accent2 = document.getElementById('accent-2');

  if (!hero || window.matchMedia('(hover: none)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Normalized offset between -0.5 and 0.5
    const moveX = (e.clientX / width) - 0.5;
    const moveY = (e.clientY / height) - 0.5;

    // 1. Update spotlight coordinates
    if (spotlight) {
      const rect = hero.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      hero.style.setProperty('--mouse-x', `${relativeX}px`);
      hero.style.setProperty('--mouse-y', `${relativeY}px`);
    }

    // 2. Bend the silk thread towards the mouse cursor
    if (silkThread) {
      const rect = hero.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      // Define a smooth Bezier path with control point bending towards mouse
      silkThread.setAttribute('d', `M -100 400 Q ${relativeX} ${relativeY} 1540 400`);
    }

    // 3. Shift showcase and accent elements (3D parallax depth layers)
    if (showcase) {
      showcase.style.transform = `translate(${moveX * 25}px, ${moveY * 25}px)`;
    }
    if (accent1) {
      accent1.style.transform = `translate(${moveX * -40}px, ${moveY * -40}px) rotate(3deg)`;
    }
    if (accent2) {
      accent2.style.transform = `translate(${moveX * 50}px, ${moveY * 50}px) rotate(-2deg)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    if (showcase) {
      showcase.style.transform = 'translate(0, 0)';
      showcase.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (accent1) {
      accent1.style.transform = 'translate(0, 0) rotate(3deg)';
      accent1.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (accent2) {
      accent2.style.transform = 'translate(0, 0) rotate(-2deg)';
      accent2.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (silkThread) {
      silkThread.setAttribute('d', `M -100 400 Q 720 200 1540 400`);
    }
  });

  hero.addEventListener('mouseenter', () => {
    if (showcase) showcase.style.transition = 'transform 0.1s ease-out';
    if (accent1) accent1.style.transition = 'transform 0.1s ease-out';
    if (accent2) accent2.style.transition = 'transform 0.1s ease-out';
  });
}

/* =========================================
   INTERACTIVE EMBROIDERY HOOP (BESPOKE ADDA)
   ========================================= */
function initHoopShowcase() {
  const container = document.getElementById('hoop-container');
  if (!container) return;

  const nodes = container.querySelectorAll('.hoop-node');
  const mainImg = document.getElementById('hoop-main-img');
  const threadPath = document.getElementById('hoop-connecting-thread');
  const cardTitle = document.getElementById('hoop-detail-title');
  const cardDesc = document.getElementById('hoop-detail-desc');
  const detailsCard = document.getElementById('hoop-details-card');

  // Node positions relative to center (220, 220)
  // Distance is 250px
  const center = 220;
  const radius = 250;

  function updateActiveNode(node) {
    // 1. Swap active states
    nodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    // 2. Change image with soft cross-fade
    const newImgSrc = node.getAttribute('data-img');
    if (mainImg) {
      mainImg.style.opacity = '0.1';
      setTimeout(() => {
        mainImg.setAttribute('src', newImgSrc);
        mainImg.style.opacity = '1';
      }, 200);
    }

    // 3. Update details card
    const title = node.getAttribute('data-title');
    const desc = node.getAttribute('data-desc');
    if (cardTitle) cardTitle.textContent = title;
    if (cardDesc) cardDesc.textContent = desc;

    // Show details card with smooth scale-up
    if (detailsCard) {
      detailsCard.style.opacity = '1';
      detailsCard.style.transform = 'translateY(0)';
    }

    // 4. Draw connecting thread curve
    if (threadPath) {
      // Get angle in degrees (e.g. 0deg, 72deg, etc.)
      const angleStr = node.style.getPropertyValue('--angle') || '0deg';
      const angleDeg = parseFloat(angleStr);
      const rad = (angleDeg * Math.PI) / 180;

      // Position on the circle perimeter
      const nodeX = center + radius * Math.cos(rad);
      const nodeY = center + radius * Math.sin(rad);

      // Create a curved path towards center (220, 220)
      // Control point is offset slightly to create a beautiful sweeping thread curve
      const cpX = center + (nodeX - center) * 0.5 + 40 * Math.sin(rad);
      const cpY = center + (nodeY - center) * 0.5 - 40 * Math.cos(rad);

      threadPath.setAttribute('d', `M ${nodeX} ${nodeY} Q ${cpX} ${cpY} ${center} ${center}`);
      threadPath.style.opacity = '0.6';

      // Animate dasharray offset for stitch-like draw effect
      threadPath.style.strokeDashoffset = '100';
      threadPath.style.strokeDasharray = '5 5';
      threadPath.getBoundingClientRect(); // trigger reflow
      threadPath.style.transition = 'stroke-dashoffset 0.8s ease, opacity 0.5s ease';
      threadPath.style.strokeDashoffset = '0';
    }
  }

  nodes.forEach(node => {
    // Interactive hover activation for absolute responsive feel
    node.addEventListener('mouseenter', () => {
      updateActiveNode(node);
    });

    node.addEventListener('click', (e) => {
      e.preventDefault();
      updateActiveNode(node);
    });
  });

  // Set default initial state for first node
  if (nodes.length > 0) {
    updateActiveNode(nodes[0]);
  }
}

/* =========================================
   3D SCROLLABLE INSTAGRAM REELS CAROUSEL (CMS)
   ========================================= */
async function initReelsCarousel() {
  const container = document.getElementById('reels-track-container');
  const track = document.getElementById('reels-track');
  const thumb = document.getElementById('reels-thumb');
  if (!container || !track) return;

  try {
    const res = await fetch('data/reels.json');
    const data = await res.json();
    
    let html = '';
    data.reels.forEach(reel => {
      // Map color groups to gradients
      const gradients = {
        magenta: { c1: '#C71585', c2: '#DAA520', c3: '#4169E1' },
        red: { c1: '#B22222', c2: '#F4C430', c3: '#FFDAB9' },
        emerald: { c1: '#116246', c2: '#D4AF37', c3: '#8FA89B' },
        purple: { c1: '#7851A9', c2: '#FF7F50', c3: '#D4AF37' },
        turquoise: { c1: '#40E0D0', c2: '#CD7F32', c3: '#DAA520' },
        gold: { c1: '#DAA520', c2: '#801824', c3: '#FAF6F0' }
      };
      
      const theme = gradients[reel.colorGroup] || gradients.gold;
      
      html += `
        <div class="reel-card" data-url="${reel.url}">
          <div class="card-back-decor">
            <img src="assets/logo.png" alt="Emblem Mandala" />
          </div>
          <div class="card-swatches">
            <span class="card-swatch" style="background: ${theme.c1}; --delay: 0.1s;"></span>
            <span class="card-swatch" style="background: ${theme.c2}; --delay: 0.2s;"></span>
            <span class="card-swatch" style="background: ${theme.c3}; --delay: 0.3s;"></span>
          </div>
          <div class="card-tool-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="scissors-icon">
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M9 16 L18 6 M15 16 L6 6" />
            </svg>
          </div>
          <div class="card-artisan-tag">
            <div class="tag-thread"></div>
            <span class="tag-title">${reel.logTitle}</span>
            <p class="tag-note">${reel.logNote}</p>
          </div>
          <div class="phone-frame">
            <div class="phone-speaker"></div>
            <div class="phone-screen">
              <img src="${reel.image}" alt="${reel.title}" />
              <div class="reel-play-overlay">
                <div class="play-btn-circle">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div class="reel-info">
                <span class="reel-tag">${reel.tag}</span>
                <h4>${reel.title}</h4>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    track.innerHTML = html;
  } catch(e) {
    console.error("Error loading reels", e);
    track.innerHTML = "<p>Error loading reels.</p>";
  }

  const cards = Array.from(track.querySelectorAll('.reel-card'));

  function updateCardTransforms() {
    const containerRect = container.getBoundingClientRect();
    const viewportCenter = containerRect.width / 2;

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
      const distance = cardCenter - viewportCenter;
      const absDistance = Math.min(Math.abs(distance), 500);
      const maxRotateY = 25;
      const rotateY = (distance / 500) * maxRotateY;
      const scale = 1.05 - (absDistance / 500) * 0.17;
      const opacity = 1 - (absDistance / 500) * 0.35;

      card.style.transform = `scale(${scale}) rotateY(${-rotateY}deg)`;
      card.style.opacity = opacity;

      if (Math.abs(distance) < 100) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (thumb) {
      const scrollableWidth = container.scrollWidth - container.clientWidth;
      if (scrollableWidth > 0) {
        const progress = container.scrollLeft / scrollableWidth;
        const scrollbarWidth = thumb.parentElement.clientWidth;
        const thumbWidth = thumb.clientWidth;
        const translateDistance = progress * (scrollbarWidth - thumbWidth);
        thumb.style.transform = `translateX(${translateDistance}px)`;
      }
    }
  }

  container.addEventListener('scroll', updateCardTransforms);

  function centerInitialCard() {
    const middleIdx = Math.floor(cards.length / 2);
    const middleCard = cards[middleIdx];
    if (middleCard) {
      const offsetLeft = middleCard.offsetLeft;
      const centerOffset = container.offsetWidth / 2 - middleCard.offsetWidth / 2;
      container.scrollLeft = offsetLeft - centerOffset;
    }
    updateCardTransforms();
  }

  setTimeout(centerInitialCard, 200);
  window.addEventListener('load', centerInitialCard);

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('active')) {
        const url = card.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      } else {
        e.preventDefault();
        e.stopPropagation();
        const offsetLeft = card.offsetLeft;
        const centerOffset = container.offsetWidth / 2 - card.offsetWidth / 2;
        container.scrollTo({
          left: offsetLeft - centerOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('active');
  });
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
  });
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });

  window.addEventListener('resize', updateCardTransforms);
}

/* =========================================
   INTERACTIVE ZARI THREAD GRID (REELS BG)
   ========================================= */
function initReelsParticles() {
  const reelsSection = document.getElementById('reels');
  const canvas = document.getElementById('reels-particles');
  const scrollContainer = document.getElementById('reels-track-container');
  if (!reelsSection || !canvas) return;

  const ctx = canvas.getContext('2d');
  let gridPoints = [];
  let sparkles = [];
  const spacing = 45; // Spacing between gold threads
  let cols, rows;
  let reelsRect = reelsSection.getBoundingClientRect();

  let mouse = { x: null, y: null, active: false, radius: 180 };

  // Generate grid points structure
  function initGrid() {
    reelsRect = reelsSection.getBoundingClientRect();
    canvas.width = reelsRect.width;
    canvas.height = reelsRect.height;

    cols = Math.ceil(canvas.width / spacing) + 1;
    rows = Math.ceil(canvas.height / spacing) + 1;
    gridPoints = [];

    for (let c = 0; c < cols; c++) {
      gridPoints[c] = [];
      for (let r = 0; r < rows; r++) {
        const homeX = c * spacing;
        const homeY = r * spacing;
        gridPoints[c][r] = {
          x: homeX,
          y: homeY,
          homeX: homeX,
          homeY: homeY,
          vx: 0,
          vy: 0
        };
      }
    }
  }

  // Floating Sequins / Sparkles
  class ZariSequin {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.opacity = 1;
      this.decay = Math.random() * 0.012 + 0.006;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.decay;
    }

    draw() {
      ctx.beginPath();
      const w = this.size * 2;
      ctx.moveTo(this.x, this.y - w);
      ctx.lineTo(this.x + w, this.y);
      ctx.lineTo(this.x, this.y + w);
      ctx.lineTo(this.x - w, this.y);
      ctx.closePath();
      ctx.fillStyle = `rgba(217, 195, 158, ${this.opacity})`;
      ctx.fill();
    }
  }

  initGrid();
  window.addEventListener('resize', initGrid);

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Update Grid points & Physics
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const node = gridPoints[c][r];

        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Pulled/bent towards mouse like a needle hooking a thread
            const pullForce = (mouse.radius - dist) / mouse.radius;
            node.x += (dx / dist) * pullForce * 7.5;
            node.y += (dy / dist) * pullForce * 7.5;
          }
        }

        // Spring back physics
        const ax = (node.homeX - node.x) * 0.055;
        const ay = (node.homeY - node.y) * 0.055;
        node.vx = (node.vx + ax) * 0.82;
        node.vy = (node.vy + ay) * 0.82;
        node.x += node.vx;
        node.y += node.vy;
      }
    }

    // 2. Draw Horizontal & Vertical Threads (Weave)
    ctx.beginPath();
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.09)'; // Fine gold thread color

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const node = gridPoints[c][r];

        // Line to right node
        if (c < cols - 1) {
          const nextNode = gridPoints[c + 1][r];
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nextNode.x, nextNode.y);
        }

        // Line to bottom node
        if (r < rows - 1) {
          const bottomNode = gridPoints[c][r + 1];
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(bottomNode.x, bottomNode.y);
        }
      }
    }
    ctx.stroke();

    // 3. Handle and draw sequins
    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
      if (sparkles[i].opacity <= 0) {
        sparkles.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(drawGrid);
  }

  // Mouse Listeners
  reelsSection.addEventListener('mouseenter', () => { mouse.active = true; });
  reelsSection.addEventListener('mouseleave', () => { mouse.active = false; });

  reelsSection.addEventListener('mousemove', (e) => {
    const rect = reelsSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // Slowly spawn gold sparkles along paths
    if (Math.random() < 0.25) {
      sparkles.push(new ZariSequin(mouse.x, mouse.y));
    }
  });

  // Pull threads on scroll
  if (scrollContainer) {
    let lastScrollLeft = scrollContainer.scrollLeft;
    scrollContainer.addEventListener('scroll', () => {
      const scrollDiff = Math.abs(scrollContainer.scrollLeft - lastScrollLeft);
      if (scrollDiff > 4) {
        lastScrollLeft = scrollContainer.scrollLeft;

        // Apply a gentle force to random column nodes to simulate fabric tugging
        const randCol = Math.floor(Math.random() * cols);
        for (let r = 0; r < rows; r++) {
          if (gridPoints[randCol] && gridPoints[randCol][r]) {
            gridPoints[randCol][r].vx += (Math.random() - 0.5) * 5;
          }
        }

        // Spawn sequins along the scroll view
        if (Math.random() < 0.3) {
          const rect = scrollContainer.getBoundingClientRect();
          const rx = Math.random() * rect.width + rect.left - reelsRect.left;
          const ry = Math.random() * 200 + (rect.height / 2 - 100) + rect.top - reelsRect.top;
          sparkles.push(new ZariSequin(rx, ry));
        }
      }
    });
  }

  // Start weave animation loop
  drawGrid();
}

/* =========================================
   CIRCULAR COLOUR WHEEL PICKER
   ========================================= */
function initColourPalette() {
  initColourWheel();
}

function initColourWheel() {
  const canvas = document.getElementById('color-wheel-canvas');
  const cursor = document.getElementById('colorwheel-cursor');
  const previewEl = document.getElementById('cw-preview-color');
  const idleEl = document.getElementById('cw-preview-idle');
  const nameEl = document.getElementById('cw-color-name');
  const hexEl = document.getElementById('cw-hex');
  const rgbEl = document.getElementById('cw-rgb');
  const hslEl = document.getElementById('cw-hsl');
  const copyBtn = document.getElementById('cw-copy-btn');
  const waBtn = document.getElementById('cw-whatsapp-btn');
  const bSlider = document.getElementById('brightness-slider');
  const bValue = document.getElementById('brightness-value');
  const bTrack = document.querySelector('#brightness-track-wrap');
  const sSlider = document.getElementById('saturation-slider');
  const sValue = document.getElementById('saturation-value');
  const sTrack = document.querySelector('#saturation-track-wrap');
  const hintPastel = document.getElementById('mode-hint-pastel');
  const hintVivid = document.getElementById('mode-hint-vivid');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const SIZE = 320;
  const cx = SIZE / 2, cy = SIZE / 2;
  const outerR = SIZE / 2 - 2;
  const innerR = outerR * 0.22; // hollow center

  let brightness = 0.65;
  let saturation = 1.0;
  let isDragging = false;
  let currentHex = null;
  let lastPickedX = null;   // last clicked X on canvas
  let lastPickedY = null;   // last clicked Y on canvas

  // ---- Indian fabric colour name map ----
  const FABRIC_NAMES = [
    { name: 'Rajwadi Crimson', h: [0, 10], s: [70, 100], l: [20, 42] },
    { name: 'Sindoori Red', h: [0, 12], s: [60, 100], l: [43, 60] },
    { name: 'Tikka Flame', h: [355, 10], s: [70, 100], l: [55, 75] },
    { name: 'Velvet Wine', h: [340, 360], s: [50, 100], l: [12, 30] },
    { name: 'Gulabi Maroon', h: [330, 355], s: [55, 100], l: [25, 50] },
    { name: 'Rani Magenta', h: [310, 340], s: [65, 100], l: [35, 65] },
    { name: 'Deep Fuchsia', h: [300, 320], s: [70, 100], l: [30, 55] },
    { name: 'Shahi Violet', h: [270, 305], s: [55, 100], l: [20, 45] },
    { name: 'Amethyst Silk', h: [260, 285], s: [60, 100], l: [20, 45] },
    { name: 'Rajkumari Purple', h: [280, 310], s: [60, 100], l: [22, 42] },
    { name: 'Lavender Organza', h: [250, 280], s: [30, 60], l: [65, 88] },
    { name: 'Indigo Brocade', h: [220, 260], s: [55, 100], l: [15, 40] },
    { name: 'Jaipur Royal Blue', h: [220, 245], s: [55, 100], l: [20, 45] },
    { name: 'Midnight Navy', h: [215, 240], s: [50, 100], l: [10, 28] },
    { name: 'Neelkanth Mist', h: [200, 225], s: [30, 65], l: [65, 88] },
    { name: 'Peacock Turquoise', h: [165, 195], s: [65, 100], l: [28, 55] },
    { name: 'Mughal Forest', h: [145, 175], s: [55, 100], l: [12, 30] },
    { name: 'Emerald Velvet', h: [130, 165], s: [50, 100], l: [22, 48] },
    { name: 'Mint Chikan', h: [120, 155], s: [25, 60], l: [68, 90] },
    { name: 'Pitambari Yellow', h: [48, 65], s: [80, 100], l: [50, 75] },
    { name: 'Haldi Saffron', h: [36, 52], s: [65, 100], l: [35, 65] },
    { name: 'Marigold Zari', h: [30, 48], s: [70, 100], l: [50, 75] },
    { name: 'Saffron Zari', h: [28, 42], s: [80, 100], l: [55, 78] },
    { name: 'Holi Orange', h: [15, 30], s: [85, 100], l: [50, 75] },
    { name: 'Basant Tangerine', h: [10, 22], s: [85, 100], l: [50, 72] },
    { name: 'Jaipur Gold', h: [38, 52], s: [40, 70], l: [50, 68] },
    { name: 'Antique Gold', h: [40, 55], s: [45, 75], l: [35, 55] },
    { name: 'Sandalwood', h: [20, 38], s: [50, 80], l: [35, 55] },
    { name: 'Mitti Terracotta', h: [15, 30], s: [50, 80], l: [38, 58] },
    { name: 'Khaadi Brown', h: [20, 40], s: [35, 65], l: [22, 40] },
    { name: 'Rose Petal Blush', h: [340, 360], s: [50, 80], l: [72, 90] },
    { name: 'Gulab Silk', h: [335, 355], s: [40, 70], l: [80, 95] },
    { name: 'Peach Chanderi', h: [10, 30], s: [50, 80], l: [80, 92] },
    { name: 'Cream Banarasi', h: [30, 55], s: [60, 100], l: [90, 100] },
    { name: 'Pure Ivory', h: [0, 360], s: [0, 15], l: [94, 100] },
    { name: 'Silver Zari', h: [0, 360], s: [0, 10], l: [65, 80] },
    { name: 'Gunmetal Silk', h: [0, 360], s: [0, 10], l: [45, 65] },
    { name: 'Kohl Black', h: [0, 360], s: [0, 20], l: [0, 18] },
    { name: 'Nude Linen', h: [20, 45], s: [15, 40], l: [38, 58] },
  ];

  function getColorName(h, s, l) {
    // Normalize hue to 0-360
    const hh = ((h % 360) + 360) % 360;
    const ss = s * 100;
    const ll = l * 100;
    for (const c of FABRIC_NAMES) {
      const [h1, h2] = c.h;
      const inH = h1 <= h2 ? (hh >= h1 && hh <= h2) : (hh >= h1 || hh <= h2);
      const inS = ss >= c.s[0] && ss <= c.s[1];
      const inL = ll >= c.l[0] && ll <= c.l[1];
      if (inH && inS && inL) return c.name;
    }
    // Fallback generic names
    if (ss < 12) return ll < 25 ? 'Kohl Black' : ll > 80 ? 'Pure White' : 'Silver Grey';
    if (hh < 15 || hh >= 345) return 'Classic Red';
    if (hh < 40) return 'Warm Orange';
    if (hh < 65) return 'Golden Yellow';
    if (hh < 150) return 'Forest Green';
    if (hh < 195) return 'Teal Silk';
    if (hh < 250) return 'Royal Blue';
    if (hh < 290) return 'Violet Silk';
    return 'Deep Magenta';
  }

  // ---- Draw colour wheel ----
  function drawWheel() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    const imageData = ctx.createImageData(SIZE, SIZE);
    const data = imageData.data;

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > outerR || dist < innerR) continue; // outside ring or inside hole

        // Hue from angle
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        if (angle < 0) angle += 360;

        // Saturation from distance (center of ring = full sat, edges slightly less)
        const sat = saturation; // controlled by slider
        const lit = brightness;

        const [r, g, b] = hslToRgb(angle / 360, sat, lit);
        const idx = (y * SIZE + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Draw hollow center (white circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim() || '#FBF8F3';
    ctx.fill();
    // Gold ring on inner edge
    ctx.strokeStyle = 'rgba(201,169,110,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Outer ring decorative gold border
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201,169,110,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  // ---- HSL → RGB ----
  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  // ---- RGB → Hex ----
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
  }

  // ---- RGB → HSL ----
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  // ---- Pick colour from canvas pixel ----
  function pickFromCanvas(x, y) {
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > outerR || dist < innerR) return; // outside ring

    // Store position so sliders can re-pick it
    lastPickedX = x;
    lastPickedY = y;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];
    const hex = rgbToHex(r, g, b);
    const [hh, ss, ll] = rgbToHsl(r, g, b);

    // Place cursor
    if (cursor) {
      cursor.classList.add('visible');
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      cursor.style.color = hex;
      cursor.style.borderColor = 'white';
    }

    updatePreviewPanel(r, g, b, hex, hh, ss, ll);
    currentHex = hex;
  }

  function updatePreviewPanel(r, g, b, hex, hh, ss, ll) {
    if (previewEl) {
      previewEl.style.background = hex;
    }
    if (idleEl) idleEl.classList.add('hidden');
    if (nameEl) {
      nameEl.style.opacity = '0';
      nameEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        const name = getColorName(hh, ss / 100, ll / 100);
        nameEl.textContent = name;
        nameEl.style.opacity = '1';
        nameEl.style.transition = 'all 0.35s ease';
        nameEl.style.transform = 'translateY(0)';

        // Update WhatsApp link
        if (waBtn) {
          const msg = encodeURIComponent(`Hello Rajwadi Boutique! 🌸\n\nI'd like my outfit in the colour: *${name}* (${hex})\n\nCould you please help me with this shade?`);
          waBtn.setAttribute('href', `https://wa.me/918559985003?text=${msg}`);
        }
      }, 60);
    }
    if (hexEl) hexEl.textContent = hex;
    if (rgbEl) rgbEl.textContent = `${r}, ${g}, ${b}`;
    if (hslEl) hslEl.textContent = `${hh}°, ${ss}%, ${ll}%`;

    // Tint chip backgrounds subtly
    document.querySelectorAll('.cw-value-chip').forEach(chip => {
      chip.style.borderColor = hex + '40';
    });
  }

  // ---- Event handling for wheel ----
  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY)
    };
  }

  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    const pos = getCanvasPos(e);
    pickFromCanvas(pos.x, pos.y);
  });
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const pos = getCanvasPos(e);
    pickFromCanvas(pos.x, pos.y);
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('click', e => {
    const pos = getCanvasPos(e);
    pickFromCanvas(pos.x, pos.y);
  });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const pos = getCanvasPos(e);
    pickFromCanvas(pos.x, pos.y);
  }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const pos = getCanvasPos(e);
    pickFromCanvas(pos.x, pos.y);
  }, { passive: false });

  // ---- Re-sample last picked position after wheel redraws ----
  function repickIfPicked() {
    if (lastPickedX !== null && lastPickedY !== null) {
      // Small delay so canvas pixels are fresh
      requestAnimationFrame(() => pickFromCanvas(lastPickedX, lastPickedY));
    }
  }

  // ---- Brightness slider ----
  if (bSlider) {
    function updateBrightness(val) {
      brightness = val / 100;
      if (bValue) bValue.textContent = val + '%';

      // Move thumb visual
      const pct = (val - 10) / 90;
      const thumbPct = 5 + pct * 90;
      if (bTrack) bTrack.style.setProperty('--thumb-pos', thumbPct + '%');

      drawWheel();
      repickIfPicked();
    }

    bSlider.addEventListener('input', () => updateBrightness(parseInt(bSlider.value)));
    updateBrightness(parseInt(bSlider.value));
  }

  // ---- Saturation slider ----
  if (sSlider) {
    function updateSaturation(val) {
      saturation = val / 100;
      if (sValue) sValue.textContent = val + '%';

      // Move thumb on saturation track
      const pct = val / 100;
      const thumbPct = 5 + pct * 90;
      if (sTrack) sTrack.style.setProperty('--thumb-pos', thumbPct + '%');

      // Update mode hint chips
      const isPastel = val < 50;
      if (hintPastel) hintPastel.classList.toggle('active', isPastel);
      if (hintVivid) hintVivid.classList.toggle('active', !isPastel);

      drawWheel();
      repickIfPicked();
    }

    sSlider.addEventListener('input', () => updateSaturation(parseInt(sSlider.value)));
    updateSaturation(parseInt(sSlider.value));

    // ---- Mode hint click presets ----
    if (hintPastel) {
      hintPastel.style.cursor = 'pointer';
      hintPastel.addEventListener('click', () => {
        sSlider.value = 25;
        updateSaturation(25);
      });
    }
    if (hintVivid) {
      hintVivid.style.cursor = 'pointer';
      hintVivid.addEventListener('click', () => {
        sSlider.value = 100;
        updateSaturation(100);
      });
    }
  }

  // ---- Copy HEX button ----
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!currentHex) return;
      navigator.clipboard.writeText(currentHex).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy HEX`;
        }, 2500);
      }).catch(() => { });
    });
  }

  // ---- Quick pick dots ----
  document.querySelectorAll('.cw-quick-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const hex = dot.getAttribute('data-hex');
      const name = dot.getAttribute('data-name');
      if (!hex) return;

      // Parse hex → rgb
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const [hh, ss, ll] = rgbToHsl(r, g, b);

      updatePreviewPanel(r, g, b, hex, hh, ss, ll);
      currentHex = hex;

      // Override name with the curated one
      if (nameEl) nameEl.textContent = name;
      if (waBtn) {
        const msg = encodeURIComponent(`Hello Rajwadi Boutique! 🌸\n\nI'd like my outfit in: *${name}* (${hex})\n\nCould you please help me with this colour?`);
        waBtn.setAttribute('href', `https://wa.me/918559985003?text=${msg}`);
      }

      // Move cursor to center (since we're not picking from wheel)
      if (cursor) {
        cursor.classList.add('visible');
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        cursor.style.color = hex;
      }

      // Highlight active dot
      document.querySelectorAll('.cw-quick-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });

    // Hover cursor
    dot.addEventListener('mouseenter', () => {
      document.getElementById('cursor-dot')?.classList.add('hover');
      document.getElementById('cursor-ring')?.classList.add('hover');
    });
    dot.addEventListener('mouseleave', () => {
      document.getElementById('cursor-dot')?.classList.remove('hover');
      document.getElementById('cursor-ring')?.classList.remove('hover');
    });
  });

  // ---- Initial draw ----
  drawWheel();
}



/* =========================================
   UNSTITCHED SUITS SHOP (CMS INTEGRATION)
   ========================================= */
async function initSuitsShop() {
  const suitsGrid = document.getElementById('suits-grid');
  const filterChips = document.querySelectorAll('.suits-filter-chip');
  if (!suitsGrid) return;

  try {
    // 1. Fetch live data from the Decap CMS JSON file
    const response = await fetch('data/suits.json');
    const data = await response.json();
    
    // 2. Generate HTML for each suit
    let html = '';
    data.suits.forEach((suit, index) => {
      // Map color groups to gradients if image is missing
      let bgStyle = '';
      if (suit.image) {
        bgStyle = `background: url('${suit.image}') center/cover;`;
      } else {
        const gradients = {
          red: 'linear-gradient(135deg, #8B0000, #C9A96E, #A68B4B)',
          green: 'linear-gradient(135deg, #2C5F2E, #4A7A4C, #C5D1C0)',
          blue: 'linear-gradient(135deg, #1B2A7B, #4169E1, #C5D8E8)',
          gold: 'linear-gradient(135deg, #C9A96E, #E2CFA5, #FAF6EE)',
          pastel: 'linear-gradient(135deg, #E8B4A0, #F2D7D0, #D4A5A5)',
          dark: 'linear-gradient(135deg, #4B0082, #7851A9, #B8A9C9)'
        };
        bgStyle = `background: ${gradients[suit.colorGroup] || gradients['pastel']};`;
      }

      // We assign random category tags for the filter logic in this demo
      const cats = ['ethnic', 'party', 'casual', 'bridal', 'premium'];
      const cat = cats[index % cats.length];
      const suitCode = `RJ-${(index+1).toString().padStart(3, '0')}`;

      html += `
        <div class="suit-card" data-category="${cat}" data-code="${suitCode}">
          <div class="suit-img" style="${bgStyle}">
            <div class="suit-code-badge">${suitCode}</div>
          </div>
          <div class="suit-info">
            <h4 class="suit-name">${suit.name}</h4>
            <p class="suit-fabric">${suit.fabric.charAt(0).toUpperCase() + suit.fabric.slice(1)} · ${suit.work.replace('-', ' ')}</p>
            <div class="suit-meta">
              <span class="suit-price">₹${suit.price.toLocaleString('en-IN')}</span>
            </div>
            <button class="suit-order-btn magnetic" data-code="${suitCode}" data-name="${suit.name}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              Order via WhatsApp
            </button>
          </div>
        </div>
      `;
    });

    // 3. Inject HTML
    suitsGrid.innerHTML = html;

    // 4. Re-bind Event Listeners for Filters
    const suitCards = document.querySelectorAll('.suit-card');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        suitCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'suitCardFadeIn 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // 5. Re-bind WhatsApp Buttons
    const orderBtns = document.querySelectorAll('.suit-order-btn');
    orderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        const name = btn.getAttribute('data-name');
        const msg = encodeURIComponent(
          `Hello Rajwadi Boutique! 🌸\n\nI'd like to order this unstitched suit:\n📋 Code: *${code}*\n👗 Name: *${name}*\n\nPlease share availability, price, and customisation options. Thank you!`
        );
        window.open(`https://wa.me/918559985003?text=${msg}`, '_blank');
      });
    });

    // Re-initialize magnetic buttons for newly injected elements
    if(typeof initMagneticButtons === 'function') initMagneticButtons();

  } catch (error) {
    console.error("Error loading suits from CMS:", error);
    suitsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Unable to load suits at this time.</p>';
  }
}

/* =========================================
   SERVICE CARDS — Staggered Entrance
   ========================================= */
function initServiceCards() {
  const cabinetItems = document.querySelectorAll('.cabinet-item');
  const slides = document.querySelectorAll('.cabinet-slide');
  
  if (!cabinetItems.length || !slides.length) return;

  cabinetItems.forEach(item => {
    // Swap active slide on mouseenter (desktop)
    item.addEventListener('mouseenter', () => {
      const targetCabinet = item.getAttribute('data-cabinet');
      
      // Update active menu trigger
      cabinetItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Update active display slide
      slides.forEach(slide => {
        const slideId = slide.getAttribute('id');
        if (slideId === `slide-${targetCabinet}`) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });

    // Make it clickable for mobile support too
    item.addEventListener('click', (e) => {
      // Don't intercept click if clicking WhatsApp link
      if (e.target.classList.contains('cabinet-whatsapp-btn')) return;

      const targetCabinet = item.getAttribute('data-cabinet');
      cabinetItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      slides.forEach(slide => {
        const slideId = slide.getAttribute('id');
        if (slideId === `slide-${targetCabinet}`) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });
  });

  // Bind custom cursor hovers for the cabinet triggers
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    const cabinetHovers = document.querySelectorAll('.cabinet-item, .cabinet-whatsapp-btn');
    cabinetHovers.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }
}

/* =========================================
   ROYAL COLOR THEORY SECTION
   (Interactive components removed, now a static callout)
   ========================================= */
  // Custom cursor for general theory items
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    const theoryHovers = document.querySelectorAll('.color-theory .btn-primary');
    theoryHovers.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }

/* =========================================
   THE HERITAGE DIARY (TESTIMONIALS) (CMS)
   ========================================= */
async function initTestimonials() {
  const pagesContainer = document.querySelector('.diary-pages');
  const prevBtn = document.getElementById('diary-prev');
  const nextBtn = document.getElementById('diary-next');
  const desk = document.querySelector('.scrapbook-desk');

  if (!pagesContainer) return;

  try {
    const res = await fetch('data/testimonials.json');
    const data = await res.json();
    
    let html = '';
    data.testimonials.forEach((test, index) => {
      const activeClass = index === 0 ? 'active' : '';
      html += `
        <div class="diary-entry ${activeClass}" id="diary-entry-${index + 1}">
          <div class="entry-meta">
            <span class="entry-date">${test.date}</span>
          </div>
          <h3 class="entry-title">${test.title}</h3>
          <p class="entry-body">${test.body}</p>
          <div class="entry-footer">
            <span class="signature">— ${test.signature}</span>
          </div>
        </div>
      `;
    });
    
    pagesContainer.innerHTML = html;
  } catch(e) {
    console.error("Error loading testimonials", e);
    pagesContainer.innerHTML = "<p>Error loading testimonials.</p>";
  }

  const entries = document.querySelectorAll('.diary-entry');
  if (!entries.length) return;

  let currentIndex = 0;
  const totalEntries = entries.length;
  let timerId = null;

  function showTestimonial(index) {
    currentIndex = (index + totalEntries) % totalEntries;
    entries.forEach((entry, idx) => {
      if (idx === currentIndex) {
        entry.classList.add('active');
      } else {
        entry.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showTestimonial(currentIndex - 1);
      resetTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showTestimonial(currentIndex + 1);
      resetTimer();
    });
  }

  function startTimer() {
    timerId = setInterval(() => {
      showTestimonial(currentIndex + 1);
    }, 6000);
  }

  function resetTimer() {
    if (timerId) {
      clearInterval(timerId);
      startTimer();
    }
  }

  startTimer();

  if (desk) {
    desk.addEventListener('mouseenter', () => {
      if (timerId) clearInterval(timerId);
    });
    desk.addEventListener('mouseleave', () => {
      startTimer();
    });
  }

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    const testimonialHovers = document.querySelectorAll('.diary-nav-btn');
    testimonialHovers.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }
}

/* =========================================
   COUTURE TRANSFORMATION SLIDER
   ========================================= */
function initTransformationSlider() {
  const slider = document.getElementById('ba-slider');
  const beforeOverlay = document.getElementById('slider-before-overlay');
  const handle = document.getElementById('slider-handle');

  if (!slider || !beforeOverlay || !handle) return;

  let isDragging = false;

  function moveSlider(clientX) {
    const rect = slider.getBoundingClientRect();
    const x = clientX - rect.left;
    
    // Calculate percentage boundary
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Apply values to handle and overlay width clip
    handle.style.left = `${percentage}%`;
    beforeOverlay.style.width = `${percentage}%`;
  }

  // Mouse event listeners
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  // Touch event listeners for mobile devices
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  });

  // Add custom cursor animations for the slider handle
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    const sliderHovers = document.querySelectorAll('.slider-handle, .premium-trans-btn');
    sliderHovers.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }
}



// ===========================================
// OCCASION STYLIST — Smart Recommender
// ===========================================
(function initOccasionStylist() {
  const occasionCards = document.querySelectorAll('.os-card');
  const vibeSection = document.getElementById('os-vibe-section');
  const vibePills = document.querySelectorAll('.os-vibe-pill');
  const resultEl = document.getElementById('os-result');
  const chosenLabel = document.getElementById('os-chosen-label');
  const resetBtn = document.getElementById('os-reset-btn');
  const waBtn = document.getElementById('os-wa-btn');

  if (!occasionCards.length) return;

  let selectedOccasion = null;

  // Recommendation data: occasion → vibe → outfit
  const recommendations = {
    wedding: {
      minimal: { name: 'Ivory Silk Sheath Gown', silhouette: 'Elegant A-line sheath with clean lines', fabrics: 'Raw Silk, Organza', tip: 'Let the fabric do the talking — pair with statement jhumkas and a soft updo.', colors: ['#F5F0E0','#C9A96E','#E8D5B5','#A0825A'] },
      traditional: { name: 'Royal Zardosi Bridal Lehenga', silhouette: 'Heavy flared lehenga with embroidered dupatta', fabrics: 'Velvet, Banarasi Silk', tip: 'Go for a contrasting dupatta colour to frame the face. Add a maang tikka for regal drama.', colors: ['#8B0000','#C9A96E','#FFD700','#5C1A1A'] },
      bold: { name: 'Ruby Velvet Cape Lehenga', silhouette: 'Cape-style blouse with voluminous skirt', fabrics: 'Velvet, Net with sequin work', tip: 'The cape silhouette replaces a dupatta — less fuss, more drama. Add a choker set.', colors: ['#9B2335','#E63946','#C9A96E','#1A1A1A'] },
      fusion: { name: 'Champagne Indo-Western Trail Gown', silhouette: 'Fitted bodice with cascading trail and cape sleeves', fabrics: 'Organza, Shimmer Net', tip: 'Perfect for reception night. Add a jewelled belt at the waist for a couture finish.', colors: ['#F5E6CC','#C9A96E','#D4AF37','#E8D5B5'] }
    },
    festive: {
      minimal: { name: 'Sage Green Chanderi Kurta Set', silhouette: 'Straight-cut kurta with palazzo', fabrics: 'Chanderi Cotton, Mul Mul', tip: 'Elegant simplicity. Add gold kolhapuris and small pearl studs for the festive touch.', colors: ['#9CAF88','#F5F0E0','#C9A96E','#6B8E6B'] },
      traditional: { name: 'Saffron Banarasi Anarkali', silhouette: 'Floor-length anarkali with heavy border', fabrics: 'Banarasi Silk, Brocade', tip: 'The gold Banarasi border catches light beautifully. Pair with a contrasting potli bag.', colors: ['#F5A623','#C9A96E','#8B4513','#FFD700'] },
      bold: { name: 'Magenta Organza Sharara Set', silhouette: 'Peplum top with flared sharara', fabrics: 'Organza, Georgette', tip: 'The peplum gives structure while the sharara brings movement. Go for heavy earrings.', colors: ['#C71585','#E91E8C','#C9A96E','#F8B4C8'] },
      fusion: { name: 'Teal Dhoti Saree Drape', silhouette: 'Pre-draped saree with dhoti style pleating', fabrics: 'Crepe, Satin Silk', tip: 'Modern draping means no struggle with pins. Add a structured blouse with bell sleeves.', colors: ['#008080','#00A693','#C9A96E','#004040'] }
    },
    party: {
      minimal: { name: 'Pearl White Draped Gown', silhouette: 'One-shoulder draped cocktail gown', fabrics: 'Georgette, Crepe', tip: 'Understated glamour. Add a metallic clutch and statement cuff bracelet.', colors: ['#FAF6EE','#E8DCC8','#C9A96E','#D2B48C'] },
      traditional: { name: 'Rose Gold Embroidered Lehenga', silhouette: 'Crop top lehenga with sheer dupatta', fabrics: 'Net, Silk with sequin', tip: 'Rose gold catches every flash and fairy light. Perfect for sangeet nights.', colors: ['#D4A76A','#F5C7A9','#C9A96E','#E8D5B5'] },
      bold: { name: 'Emerald Sequin Co-ord Set', silhouette: 'Sequin bustier with palazzo pants', fabrics: 'Sequin Net, Satin', tip: 'All-over sequins for maximum impact. Keep jewellery minimal — let the outfit shine.', colors: ['#2C5F2E','#50C878','#C9A96E','#004225'] },
      fusion: { name: 'Lavender Cape & Palazzo Set', silhouette: 'Flowy cape jacket with fitted palazzo', fabrics: 'Georgette, Shimmer Lycra', tip: 'The cape adds ethereal drama with zero effort. Add block heels and a sleek bun.', colors: ['#9B8EC0','#D8BFD8','#C9A96E','#6B5B8D'] }
    },
    ceremony: {
      minimal: { name: 'Ivory Silk Kurta with Gold Border', silhouette: 'Classic A-line kurta with churidar', fabrics: 'Chanderi Silk', tip: 'Effortlessly traditional. A gold dupatta draped on one shoulder completes the look.', colors: ['#FAF6EE','#C9A96E','#F5E6CC','#A0825A'] },
      traditional: { name: 'Peach Banarasi Saree', silhouette: 'Classic 6-yard saree with heavy pallu', fabrics: 'Pure Banarasi Silk', tip: 'The pallu is the star — let it drape freely. Style hair in a bun with fresh flowers.', colors: ['#FFDAB9','#F5C7A9','#C9A96E','#D2691E'] },
      bold: { name: 'Deep Maroon Velvet Anarkali', silhouette: 'Floor-length anarkali with gold embroidery', fabrics: 'Velvet, Raw Silk', tip: 'Velvet anarkalis look regal under ceremony lighting. Add a kundan choker set.', colors: ['#5C1A1A','#800000','#C9A96E','#FFD700'] },
      fusion: { name: 'Blush Organza Peplum & Skirt', silhouette: 'Peplum top with flared skirt and organza dupatta', fabrics: 'Organza, Net', tip: 'The peplum structure with flowy organza creates a dreamy silhouette. Perfect for haldi.', colors: ['#F8B4C8','#FFD1DC','#C9A96E','#E8A0C0'] }
    },
    formal: {
      minimal: { name: 'Champagne Silk Saree', silhouette: 'Sleek drape saree with tailored blouse', fabrics: 'Tussar Silk, Crepe', tip: 'Corporate elegance meets tradition. A structured blouse with 3/4 sleeves adds polish.', colors: ['#F5E6CC','#C9A96E','#E8D5B5','#A0825A'] },
      traditional: { name: 'Navy Brocade Sherwani', silhouette: 'Fitted long sherwani with churidar', fabrics: 'Brocade, Raw Silk', tip: 'Navy and gold is a timeless power combination. Add a jewelled brooch.', colors: ['#1B2A7B','#2C3E8E','#C9A96E','#FFD700'] },
      bold: { name: 'Black Velvet Gown with Gold Embroidery', silhouette: 'Fitted mermaid silhouette with gold zardosi', fabrics: 'Velvet, Organza', tip: 'The ultimate power outfit. Keep accessories minimal — the embroidery is the jewellery.', colors: ['#1A1A1A','#2D2D2D','#C9A96E','#FFD700'] },
      fusion: { name: 'Charcoal Indo-Western Blazer Set', silhouette: 'Structured blazer with dhoti pants', fabrics: 'Suiting Fabric, Silk Blend', tip: 'Modern boardroom meets festive flair. Roll the sleeves for a relaxed power look.', colors: ['#3D3D3D','#5A5A5A','#C9A96E','#E8D5B5'] }
    },
    casual: {
      minimal: { name: 'Ivory Cotton Kurta & Palazzo', silhouette: 'Relaxed A-line kurta with wide palazzo', fabrics: 'Cotton, Mul Mul', tip: 'Breathable, effortless, and endlessly chic. Add juttis and a straw bag.', colors: ['#FAF6EE','#F5F0E0','#C9A96E','#E8DCC8'] },
      traditional: { name: 'Sky Blue Chanderi A-line Kurta', silhouette: 'Flared A-line with block print dupatta', fabrics: 'Chanderi, Cotton Silk', tip: 'Block prints add artisanal character. Pair with oxidised silver jhumkas.', colors: ['#87CEEB','#5BA3CF','#C9A96E','#F5F0E0'] },
      bold: { name: 'Coral Georgette Maxi Dress', silhouette: 'Tiered maxi with ruffled sleeves', fabrics: 'Georgette, Chiffon', tip: 'Statement colour with fun movement. Add wedge heels and woven hoops.', colors: ['#FF6B6B','#FF8E72','#C9A96E','#FFB4A2'] },
      fusion: { name: 'Olive Dhoti Pants & Crop Top', silhouette: 'Structured crop with draped dhoti pants', fabrics: 'Linen, Cotton Blend', tip: 'Street-smart meets desi. Add chunky sneakers and a crossbody bag for the ultimate vibe.', colors: ['#6B8E23','#8FBC8F','#C9A96E','#556B2F'] }
    }
  };

  const occasionNames = { wedding: '💍 Wedding', festive: '🪔 Festive', party: '🥂 Party', ceremony: '🙏 Ceremony', formal: '💼 Formal', casual: '🌸 Casual' };

  occasionCards.forEach(card => {
    card.addEventListener('click', () => {
      occasionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOccasion = card.dataset.occasion;
      chosenLabel.textContent = occasionNames[selectedOccasion] || selectedOccasion;
      vibeSection.style.display = '';
      resultEl.style.display = 'none';
      vibePills.forEach(p => p.classList.remove('selected'));
      vibeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  vibePills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (!selectedOccasion) return;
      vibePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      const vibe = pill.dataset.vibe;
      const rec = recommendations[selectedOccasion]?.[vibe];
      if (!rec) return;

      document.getElementById('os-result-title').textContent = rec.name;
      document.getElementById('os-r-silhouette').textContent = rec.silhouette;
      document.getElementById('os-r-fabrics').textContent = rec.fabrics;
      document.getElementById('os-r-tip').textContent = rec.tip;

      const colorsEl = document.getElementById('os-r-colors');
      colorsEl.innerHTML = rec.colors.map(c =>
        `<div class="os-palette-swatch" style="background:${c};" title="${c}"></div>`
      ).join('');

      const waText = encodeURIComponent(`Hello Rajwadi Boutique Jaipur! ✨ I used your Occasion Stylist and love this look:\n\n🎨 ${rec.name}\n📐 ${rec.silhouette}\n🧵 ${rec.fabrics}\n🎯 Occasion: ${occasionNames[selectedOccasion]}\n💫 Vibe: ${vibe}\n\nI'd like to discuss this design!`);
      waBtn.href = `https://wa.me/918559985003?text=${waText}`;

      resultEl.style.display = '';
      setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      occasionCards.forEach(c => c.classList.remove('selected'));
      vibePills.forEach(p => p.classList.remove('selected'));
      vibeSection.style.display = 'none';
      resultEl.style.display = 'none';
      selectedOccasion = null;
      document.getElementById('os-occasions').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();


// ===========================================
// STYLE ROULETTE — Spin the Wheel
// ===========================================
(function initStyleRoulette() {
  const canvas = document.getElementById('roulette-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const spinBtn = document.getElementById('sr-spin-btn');
  const againBtn = document.getElementById('sr-again-btn');
  const idleEl = document.getElementById('sr-idle');
  const resultCard = document.getElementById('sr-result-card');
  const pointer = document.querySelector('.sr-pointer');

  const segments = [
    { name: 'Teal Velvet Cape Lehenga', desc: 'A modern royal look — deep teal velvet with a dramatic cape replacing the dupatta. Embroidered with antique gold zardosi.', color: '#2C5E61', textColor: '#fff', occasion: 'Wedding / Reception', fabric: 'Velvet & Net', palette: ['#2C5E61','#C9A96E','#1B3C3E'] },
    { name: 'Blush Organza Saree Gown', desc: 'Dreamy pre-stitched saree gown in soft blush. Zero fuss, maximum elegance with cascading organza ruffles.', color: '#D9B48F', textColor: '#fff', occasion: 'Engagement / Party', fabric: 'Organza & Satin', palette: ['#D9B48F','#E8CBB0','#C9A96E'] },
    { name: 'Royal Zardosi Anarkali', desc: 'Floor-length anarkali with intricate zardosi handwork on the bodice. Heavy but graceful — a Rajwadi signature.', color: '#5C2028', textColor: '#fff', occasion: 'Wedding / Festive', fabric: 'Raw Silk & Velvet', palette: ['#5C2028','#C9A96E','#801420'] },
    { name: 'Emerald Silk Sherwani', desc: 'Regal green sherwani with self-tone embroidery and a gold pocket square. Commanding and sophisticated.', color: '#3A4F3F', textColor: '#fff', occasion: 'Wedding / Formal', fabric: 'Dupion Silk', palette: ['#3A4F3F','#C9A96E','#213125'] },
    { name: 'Coral Georgette Fusion Set', desc: 'Playful co-ord set with a cropped cape top and flared pants. Modern Indian fusion at its most vibrant.', color: '#B87D75', textColor: '#fff', occasion: 'Party / Casual', fabric: 'Georgette & Crepe', palette: ['#B87D75','#D59C94','#C9A96E'] },
    { name: 'Ivory Banarasi Drape Gown', desc: 'Pure Banarasi silk reimagined as a structured gown with a golden brocade waistband. Timeless luxury.', color: '#FAF6EE', textColor: '#3a3020', occasion: 'Wedding / Ceremony', fabric: 'Banarasi Silk & Brocade', palette: ['#FAF6EE','#C9A96E','#EADCC6'] },
    { name: 'Wine Velvet Evening Gown', desc: 'Deep wine velvet gown with a jewelled neckline and mermaid silhouette. Red carpet energy.', color: '#4C2D3A', textColor: '#fff', occasion: 'Reception / Formal', fabric: 'Velvet & Sequin Net', palette: ['#4C2D3A','#C9A96E','#2A1720'] },
    { name: 'Saffron Chanderi Kurti Set', desc: 'Vibrant saffron kurta with gold block prints and an airy palazzo. Festive sunshine in fabric form.', color: '#D4A25F', textColor: '#fff', occasion: 'Festive / Casual', fabric: 'Chanderi & Cotton', palette: ['#D4A25F','#E8BA7B','#C9A96E'] }
  ];

  const N = segments.length;
  const ARC = (2 * Math.PI) / N;
  let currentAngle = 0;
  let isSpinning = false;

  // Use actual canvas pixel size
  const W = canvas.width;
  const H = canvas.height;
  const CX = W / 2;
  const CY = H / 2;
  const R = W / 2 - 8;

  function drawWheel(angle) {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(angle);

    for (let i = 0; i < N; i++) {
      const startAngle = i * ARC - Math.PI / 2;
      const endAngle = startAngle + ARC;

      // Segment
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segments[i].color;
      ctx.fill();

      // Border
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.rotate(startAngle + ARC / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = segments[i].textColor;
      ctx.font = '600 11px sans-serif';

      const label = segments[i].name;
      const maxLen = 22;
      const displayText = label.length > maxLen ? label.substring(0, maxLen) + '…' : label;
      ctx.fillText(displayText, R - 28, 4);
      ctx.restore();
    }

    // Outer premium golden ring
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.85)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Draw little golden rivets/beads on segment dividers
    for (let i = 0; i < N; i++) {
      const dividerAngle = i * ARC - Math.PI / 2;
      const rx = (R - 3) * Math.cos(dividerAngle);
      const ry = (R - 3) * Math.sin(dividerAngle);
      ctx.beginPath();
      ctx.arc(rx, ry, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = 'var(--gold-dark)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Inner ring
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, 2 * Math.PI);
    ctx.fillStyle = '#FAF6EE';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,169,110,0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  drawWheel(currentAngle);

  function spin() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;

    // Hide previous result
    resultCard.style.display = 'none';
    idleEl.style.display = '';

    // Random target: 4-8 full rotations + random segment
    const extraRotations = (4 + Math.random() * 4) * 2 * Math.PI;
    const targetSegment = Math.floor(Math.random() * N);
    const segmentAngle = targetSegment * ARC + ARC * 0.5; // land in the middle area
    const totalAngle = extraRotations + segmentAngle;

    const startAngle = currentAngle;
    const duration = 4000 + Math.random() * 1000;
    const startTime = performance.now();
    let lastSegmentIndex = -1;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);

      currentAngle = startAngle + totalAngle * eased;
      drawWheel(currentAngle);

      // Interactive Pointer ticking animation
      const currentSegmentIdx = Math.floor((((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / ARC);
      if (currentSegmentIdx !== lastSegmentIndex) {
        lastSegmentIndex = currentSegmentIdx;
        if (pointer) {
          pointer.classList.remove('bounce');
          void pointer.offsetWidth; // Trigger DOM reflow
          pointer.classList.add('bounce');
        }
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        isSpinning = false;
        spinBtn.disabled = false;
        showResult(targetSegment);
      }
    }

    requestAnimationFrame(animate);
  }

  function showResult(idx) {
    const seg = segments[idx];
    document.getElementById('sr-result-name').textContent = seg.name;
    document.getElementById('sr-result-desc').textContent = seg.desc;
    document.getElementById('sr-meta-occasion').textContent = seg.occasion;
    document.getElementById('sr-meta-fabric').textContent = seg.fabric;

    const paletteEl = document.getElementById('sr-palette');
    paletteEl.innerHTML = seg.palette.map(c =>
      `<div class="sr-palette-dot" style="background:${c};" title="${c}"></div>`
    ).join('');

    const waText = encodeURIComponent(`Hello Rajwadi Boutique Jaipur! ✨ I spun the Style Roulette on your website and love this look:\n\n🎰 ${seg.name}\n🧵 ${seg.fabric}\n🎯 Best for: ${seg.occasion}\n\nI'd like to get this outfit customised!`);
    document.getElementById('sr-wa-btn').href = `https://wa.me/918559985003?text=${waText}`;

    idleEl.style.display = 'none';
    resultCard.style.display = '';
  }

  spinBtn.addEventListener('click', spin);
  if (againBtn) againBtn.addEventListener('click', spin);
})();


