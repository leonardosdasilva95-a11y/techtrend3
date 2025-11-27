// Importando dependências
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS, assets)
app.use(express.static(path.join(__dirname, "..")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Exemplo de rota de API (futuro: integração com IA)
app.post("/api/gerar-video", (req, res) => {
  const { prompt, efeito } = req.body;
  // Aqui você pode integrar com Google Vertex AI ou outra API
  res.json({ status: "ok", mensagem: `Vídeo gerado com efeito: ${efeito}` });
});

app.post("/api/gerar-imagem", (req, res) => {
  const { prompt } = req.body;
  // Aqui você pode integrar com IA para gerar imagens
  res.json({ status: "ok", mensagem: `Imagem gerada para prompt: ${prompt}` });
});

// Inicializando servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
