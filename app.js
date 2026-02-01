const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Rota principal do webhook
app.post("/tot-webhook", async (req, res) => {
  const payload = req.body;
  console.log("Webhook recebido:", payload);

  try {
    await axios.post(process.env.DISCORD_WEBHOOK, {
      content: `📢 Novo evento: ${JSON.stringify(payload)}`
    });
    res.json({ status: "forwarded", message: "Enviado ao Discord" });
  } catch (err) {
    console.error("Erro ao enviar ao Discord:", err.message);
    res.status(500).json({ status: "failed", error: err.message });
  }
});

// ✅ Rota de teste manual
app.get("/test-discord", async (req, res) => {
  try {
    await axios.post(process.env.DISCORD_WEBHOOK, {
      content: "Mensagem de teste direto pelo app.js 🚀"
    });
    res.json({ status: "forwarded", message: "Mensagem de teste enviada ao Discord" });
  } catch (err) {
    console.error("Erro ao enviar ao Discord:", err.message);
    res.status(500).json({ status: "failed", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de Webhook Forwarder está rodando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
