import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Isso vai carregar as variáveis de ambiente do arquivo .env
import pacienteRouter from "./router/PacienteRouter.js"
import medicoRouter from "./router/MedicoRouter.js"
import ConsultaRouter from "./router/ConsultaRouter.js"
import SalaRouter from "./router/SalaRouter.js"
import ProntuarioRouter from "./router/ProntuarioRouter.js"

const app = express();

app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON

// Configuração das rotas
app.use('/api/paciente', pacienteRouter);
app.use('/api/medicos', medicoRouter);
app.use('/api/consulta', ConsultaRouter);
app.use('/api/sala', SalaRouter);
app.use('/api/prontuario', ProntuarioRouter);

console.log('Rotas carregadas corretamente!');

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});