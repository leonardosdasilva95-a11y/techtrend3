from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import imageio
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # habilita CORS para evitar bloqueio no navegador

# 🔹 Rota de teste simples
@app.route("/teste")
def teste():
    return {"status": "ok", "mensagem": "Backend está rodando!"}

# 🔹 Rota principal para gerar vídeo
@app.route("/api/gerar-video", methods=["POST"])
def gerar_video():
    try:
        # Verifica se a imagem foi enviada
        if "imagem" not in request.files:
            return jsonify({"erro": "Nenhuma imagem enviada"}), 400

        file = request.files["imagem"]
        segundos = int(request.form.get("segundos", 3))
        fps = int(request.form.get("fps", 30))

        # Abre a imagem
        img = Image.open(file.stream).convert("RGB")

        # Cria frames repetidos (efeito simples só para teste)
        frames = [np.array(img.copy()) for _ in range(segundos * fps)]

        # Salva em memória como vídeo MP4 usando FFmpeg
        buf = io.BytesIO()
        imageio.mimsave(buf, frames, fps=fps, format="FFMPEG")
        buf.seek(0)

        return send_file(buf, mimetype="video/mp4")

    except Exception as e:
        # Retorna erro detalhado
        return jsonify({"erro": str(e)}), 500


if __name__ == "__main__":
    # Modo debug ativado para mostrar erros detalhados
    app.run(host="0.0.0.0", port=5000, debug=True)
