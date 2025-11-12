document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Botão para alternar tema
  const toggle = document.createElement("button");
  toggle.textContent = "Alternar tema";
  toggle.style.position = "fixed";
  toggle.style.bottom = "1rem";
  toggle.style.right = "1rem";
  toggle.style.padding = "0.5rem 1rem";
  toggle.style.backgroundColor = "#00bcd4";
  toggle.style.color = "#121212";
  toggle.style.border = "none";
  toggle.style.borderRadius = "5px";
  toggle.style.cursor = "pointer";

  toggle.onclick = () => {
    body.classList.toggle("dark-theme");
  };

  document.body.appendChild(toggle);
});
