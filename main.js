// BioDermika — interacciones mínimas
document.documentElement.classList.add('js');

// Entrada del hero
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
});
// Por si "load" tarda (video pesado), arrancar igual
setTimeout(() => document.body.classList.add('is-loaded'), 1200);

// Escala de pH: el marcador viaja a 5.5 al entrar en pantalla
const ph = document.querySelector('[data-ph]');
if (ph && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { ph.classList.add('is-in'); obs.disconnect(); }
    });
  }, { threshold: 0.6 }).observe(ph);
} else if (ph) {
  ph.classList.add('is-in');
}

// Clips: se reproducen solo cuando están visibles
const clips = document.querySelectorAll('.video__clips video');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.play().catch(() => {}); }
      else { e.target.pause(); }
    });
  }, { threshold: 0.4 });
  clips.forEach(v => io.observe(v));
}

// Copiar código de descuento
const code = document.querySelector('[data-copy]');
if (code) {
  const hint = code.querySelector('.code__hint');
  code.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.dataset.copy);
      hint.textContent = 'Copiado';
    } catch {
      hint.textContent = 'BIOPUREZA';
    }
    setTimeout(() => { hint.textContent = 'Copiar'; }, 2000);
  });
}
