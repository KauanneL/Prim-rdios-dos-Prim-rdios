import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Isso vai carregar as variáveis de ambiente do arquivo .env
import pacienteRouter from "./router/PacienteRouter.js"
import medicoRouter from "./router/MedicoRouter.js"
import ConsultaRouter from "./router/ConsultaRouter.js"
import SalaRouter from "./router/SalaRouter.js"
import ProntuarioRouter from "./router/ProntuarioRouter.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { Response, Request } from "express";

// Obtém o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);

// Obtém o diretório do arquivo atual
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON

// Configuração das rotas
app.use('/api/paciente', pacienteRouter);
app.use('/api/medicos', medicoRouter);
app.use('/api/consulta', ConsultaRouter);
app.use('/api/sala', SalaRouter);
app.use('/api/prontuario', ProntuarioRouter);

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.static(path.join(__dirname)));

console.log('Rotas carregadas corretamente!');

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});