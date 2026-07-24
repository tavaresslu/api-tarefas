// src/index.ts
import express from 'express';
import tarefasRouter from "./routes/tarefas.routes";

const app = express();
const PORTA = 3333;

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json());

// Rotas da API de Tarefas
app.use("/tarefas", tarefasRouter);

// --- NOSSAS ROTAS DE TESTE ---

// Rota 1: GET na raiz
app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API funcionando!' });
});

// Rota 2: POST na raiz
app.post('/', (req, res) => {
  res.status(201).send('Recebemos seu POST! Obrigado!');
});

// --- FIM DAS ROTAS ---

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});