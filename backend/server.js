import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Lê o JSON de credenciais OAuth
const oauthConfig = JSON.parse(fs.readFileSync("./config/oauth.json", "utf-8"));

// Função para pegar access_token usando refresh_token
async function getAccessToken() {
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(oauthConfig)
  });

  const data = await resp.json();
  if (!data.access_token) {
    throw new Error("Não foi possível obter access_token");
  }
  return data.access_token;
}

// Endpoint para gerar imagem com IA (Google Imagen API)
app.post("/api/gerar-imagem", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      status: "error",
      message: "Prompt não fornecido"
    });
  }

  try {
    const accessToken = await getAccessToken();

    const resp = await fetch("https://generativelanguage.googleapis.com/v1beta2/models/imagen-3.0:generateImage", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: { text: prompt },
        size: "1024x1024",
        numberOfImages: 1
      })
    });

    if (!resp.ok) {
      throw new Error(`Erro na API Google: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();

    // Aqui você adapta conforme o formato da resposta da Imagen API
    // Exemplo: supondo que venha um campo "imageUrl"
    const imageUrl = data.imageUrl || "https://via.placeholder.com/500x300.png?text=Erro+na+IA";

    res.json({
      status: "success",
      prompt: prompt,
      image_url: imageUrl,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Falha ao gerar imagem",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
