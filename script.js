// Alternar tema claro/escuro
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const stored = localStorage.getItem('theme');

if (stored === 'light') root.classList.add('light');

themeBtn?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  themeBtn.textContent = root.classList.contains('light') ? '🌞' : '🌙';
});

// Menu mobile
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));

// Busca (apenas visual; você pode integrar depois)
document.querySelector('.search')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = e.currentTarget.querySelector('input')?.value?.trim();
  if (q) alert(`Buscar por: ${q} (implemente sua lógica aqui)`);
});
