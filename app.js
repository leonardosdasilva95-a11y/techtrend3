// frontend/app.js

document.getElementById('btnGerar').addEventListener('click', async () => {
  const file = document.getElementById('imagem').files[0];
  const efeito = document.getElementById('efeito').value;
  const status = document.getElementById('status');
  const resultado = document.getElementById('resultado');

  if (!file) {
    alert('Selecione uma imagem primeiro.');
    return;
  }

  status.textContent = '⏳ Processando...';

  const formData = new FormData();
  formData.append('imagem', file);
  formData.append('efeito', efeito);
  formData.append('segundos', '3');
  formData.append('fps', '30');

  // Detecta se está rodando local ou em produção
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const backendURL = isLocal 
    ? "http://localhost:5000/api/gerar-video" 
    : "https://SEU_BACKEND_PUBLICO/api/gerar-video"; 
    // 👉 troque pelo endereço público do backend quando hospedar

  try {
    const resp = await fetch(backendURL, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) throw new Error('Falha ao gerar vídeo');

    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);

    resultado.innerHTML = `<video controls src="${url}" style="max-width:720px; border-radius:12px; box-shadow:0 0 20px rgba(0,188,212,0.4)"></video>`;
    status.textContent = '✅ Vídeo pronto!';
  } catch (err) {
    status.textContent = '❌ Erro ao gerar vídeo.';
    resultado.textContent = err.message;
  }
});
