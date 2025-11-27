// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  // Botão "Comece agora"
  const btnStart = document.getElementById("btnStart");
  const gerador = document.getElementById("gerador");

  btnStart?.addEventListener("click", () => {
    gerador.style.display = "block";
  });

  // Interpretação do prompt de vídeo
  const btnPrompt = document.getElementById("btnPrompt");
  const promptInput = document.getElementById("promptInput");
  const promptStatus = document.getElementById("promptStatus");

  btnPrompt?.addEventListener("click", () => {
    const texto = promptInput.value.trim();
    if (texto.length === 0) {
      promptStatus.textContent = "Por favor, descreva seu vídeo.";
      promptStatus.style.color = "red";
    } else {
      promptStatus.textContent = "Interpretando pedido...";
      promptStatus.style.color = "lime";
      // Aqui você pode integrar com IA futuramente
      setTimeout(() => {
        promptStatus.textContent = "Pedido interpretado com sucesso!";
      }, 1500);
    }
  });

  // Gerador de vídeo
  const btnGerar = document.getElementById("btnGerar");
  const status = document.getElementById("status");
  const resultado = document.getElementById("resultado");
  const compartilhar = document.getElementById("compartilhar");

  btnGerar?.addEventListener("click", () => {
    status.textContent = "Gerando vídeo...";
    status.style.color = "lime";

    // Simulação de geração
    setTimeout(() => {
      status.textContent = "Vídeo gerado com sucesso!";
      resultado.innerHTML = "<p>[Prévia do vídeo aqui]</p>";
      compartilhar.style.display = "block";
    }, 2000);
  });

  // Compartilhamento
  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert(`Compartilhando no ${btn.textContent.trim()}...`);
    });
  });

  // Gerador de imagem
  const btnImagem = document.getElementById("btnImagem");
  const promptImagem = document.getElementById("promptImagem");
  const statusImagem = document.getElementById("statusImagem");
  const resultadoImagem = document.getElementById("resultadoImagem");

  btnImagem?.addEventListener("click", () => {
    const texto = promptImagem.value.trim();
    if (texto.length === 0) {
      statusImagem.textContent = "Por favor, descreva a imagem.";
      statusImagem.style.color = "red";
    } else {
      statusImagem.textContent = "Gerando imagem...";
      statusImagem.style.color = "lime";

      // Simulação de geração
      setTimeout(() => {
        statusImagem.textContent = "Imagem gerada com sucesso!";
        resultadoImagem.innerHTML = `<img src="assets/icons/image.svg" alt="Imagem gerada" class="icon" />`;
      }, 2000);
    }
  });

  // Login com Google
  const googleLogin = document.getElementById("googleLogin");
  googleLogin?.addEventListener("click", () => {
    alert("Login com Google em desenvolvimento...");
    // Aqui você pode integrar com Google Identity Services
  });
});
// Menu hamburguer responsivo
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
