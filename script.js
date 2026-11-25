// ===== Année du footer =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ===== Menu mobile =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ===== Navbar + bouton retour en haut =====
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Effet Matrix en arrière-plan =====
const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const chars = '01<>/{}[]();#$%&ABCDEF'.split('');
  const size = 16;
  let cols, drops;
  const init = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / size);
    drops = Array(cols).fill(1);
  };
  init();
  window.addEventListener('resize', init);
  setInterval(() => {
    ctx.fillStyle = 'rgba(8,16,11,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#34c46e';
    ctx.font = size + 'px monospace';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
      if (y * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 60);
}

// ===== Effet machine à écrire =====
const typing = document.getElementById('typing');
if (typing) {
  const words = ['Réseaux & Systèmes informatiques', 'futur expert en Cybersécurité', 'développeur en apprentissage'];
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    typing.textContent = word.substring(0, c);
    if (!del && c < word.length) c++;
    else if (!del) { del = true; return setTimeout(tick, 1400); }
    else if (del && c > 0) c--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 40 : 80);
  };
  tick();
}

// ===== Faux terminal animé =====
const term = document.getElementById('term');
if (term) {
  const lines = [
    '$ whoami',
    'vladimir_zombre',
    '$ cat profil.txt',
    'Ecole   : IST/UBS Ouaga 2000',
    'Filiere : Reseaux & Systemes info',
    'Objectif: Master en Cybersecurite',
    '$ ping avenir.local',
    'Reponse : 64 octets, temps=1ms',
    '$ _'
  ];
  let l = 0, ch = 0, out = '';
  const type = () => {
    if (l >= lines.length) return;
    if (ch < lines[l].length) {
      out += lines[l][ch++];
      term.textContent = out;
      setTimeout(type, 28);
    } else {
      out += '\n'; l++; ch = 0;
      term.textContent = out;
      setTimeout(type, 350);
    }
  };
  type();
}

// ===== Apparition au scroll + barres + compteurs =====
const animateCount = el => {
  const target = +el.dataset.count;
  let n = 0;
  const step = setInterval(() => {
    n++;
    el.textContent = n;
    if (n >= target) clearInterval(step);
  }, 220);
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    e.target.querySelectorAll('.skill').forEach(s => {
      s.querySelector('.bar div').style.width = s.dataset.level + '%';
    });
    e.target.querySelectorAll('[data-count]').forEach(animateCount);
    observer.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Formulaire de contact (ouvre le client mail) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const sujet = encodeURIComponent('Contact portfolio - ' + nom);
    const corps = encodeURIComponent(message + '\n\nDe : ' + nom + ' (' + email + ')');
    // Remplace par ton adresse email
    window.location.href = 'mailto:TON_EMAIL@exemple.com?subject=' + sujet + '&body=' + corps;
    document.getElementById('formMsg').textContent = '> Ouverture de votre messagerie...';
    form.reset();
  });
}
