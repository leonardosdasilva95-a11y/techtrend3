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

// Filtro por categoria
const filterButtons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    cards.forEach(card => {
      if (category === "all") {
        card.style.display = "block";
      } else {
        card.style.display = card.classList.contains(category) ? "block" : "none";
      }
    });
  });
});
