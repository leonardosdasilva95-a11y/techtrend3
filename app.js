// frontend/app.js

document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("btnStart");
  const gerador = document.getElementById("gerador");
  const btnGerar = document.getElementById("btnGerar");
  const status = document.getElementById("status");
  const resultado = document.getElementById("resultado");

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
    } catch (err) {
      status.textContent = "❌ Erro ao gerar vídeo.";
      resultado.textContent = err.message;
    }
  });
});
