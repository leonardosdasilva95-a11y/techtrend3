// frontend/app.js

document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("btnStart");
  const gerador = document.getElementById("gerador");
  const btnGerar = document.getElementById("btnGerar");
  const status = document.getElementById("status");
  const resultado = document.getElementById("resultado");
  const googleBtn = document.getElementById("googleLogin");

  // Elementos da prompt-box
  const btnPrompt = document.getElementById("btnPrompt");
  const promptInput = document.getElementById("promptInput");
  const promptStatus = document.getElementById("promptStatus");

  // Botão "Comece agora" abre/fecha o gerador
  btnStart.addEventListener("click", () => {
    if (gerador.style.display === "none") {
      gerador.style.display = "block";
      btnStart.textContent = "Fechar Gerador";
    } else {
      gerador.style.display = "none";
      btnStart.textContent = "Comece agora";
    }
  });

  // Botão "Interpretar pedido" da prompt-box
  btnPrompt.addEventListener("click", () => {
    const pedido = promptInput.value.trim();
    if (!pedido) {
      alert("Escreva como você quer seu vídeo 3D.");
      return;
    }

    promptStatus.textContent = "⏳ Interpretando seu pedido...";

    // Lógica simples: detecta palavras-chave
    let efeito = "parallax";
    if (pedido.toLowerCase().includes("zoom")) efeito = "zoom";
    if (pedido.toLowerCase().includes("profundidade")) efeito = "profundidade";

    // Aplica efeito no gerador
    document.getElementById("efeito").value = efeito;
    gerador.style.display = "block";
    promptStatus.textContent = "✅ Pedido interpretado! Agora envie sua imagem e clique em 'Gerar vídeo'.";
  });

  // Botão "Gerar vídeo"
  btnGerar.addEventListener("click", async () => {
    const file = document.getElementById("imagem").files[0];
    const efeito = document.getElementById("efeito").value;

    if (!file) {
      alert("Selecione uma imagem primeiro.");
      return;
    }

    status.textContent = "⏳ Processando...";

    const formData = new FormData();
    formData.append("imagem", file);
    formData.append("efeito", efeito);
    formData.append("segundos", "3");
    formData.append("fps", "30");

    try {
      // Durante desenvolvimento use localhost
      const resp = await fetch("http://localhost:5000/api/gerar-video", {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) throw new Error("Falha ao gerar vídeo");

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      resultado.innerHTML = `<video controls src="${url}" style="max-width:720px; border-radius:12px; box-shadow:0 0 20px rgba(0,188,212,0.4)"></video>`;
      status.textContent = "✅ Vídeo pronto!";
      document.getElementById("compartilhar").style.display = "block";

      // Exemplo de link público (troque pelo link real quando tiver hospedagem)
      const videoLink = "https://seusite.com/video.mp4";

      document.getElementById("shareWhats").onclick = () => {
        window.open(`https://api.whatsapp.com/send?text=Olha%20meu%20vídeo%20${encodeURIComponent(videoLink)}`, "_blank");
      };

      document.getElementById("shareFace").onclick = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoLink)}`, "_blank");
      };

      document.getElementById("shareX").onclick = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoLink)}&text=Olha%20meu%20vídeo%20em%203D!`, "_blank");
      };

      document.getElementById("shareLinked").onclick = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoLink)}`, "_blank");
      };
    } catch (err) {
      status.textContent = "❌ Erro ao gerar vídeo.";
      resultado.textContent = err.message;
    }
  });

  // Botão "Entrar com Google"
  googleBtn.addEventListener("click", () => {
    window.open("https://accounts.google.com/signin", "_blank");
  });
});

