import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); 
import pacienteRouter from "./router/PacienteRouter.js"
import medicoRouter from "./router/MedicoRouter.js"
import ConsultaRouter from "./router/ConsultaRouter.js"
import SalaRouter from "./router/SalaRouter.js"
import ProntuarioRouter from "./router/ProntuarioRouter.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/paciente', pacienteRouter);
app.use('/api/medicos', medicoRouter);
app.use('/api/consultas', ConsultaRouter);
app.use('/api/salas', SalaRouter);
app.use('/api/prontuarios', ProntuarioRouter);

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.static(path.join(__dirname)));

console.log('Rotas carregadas corretamente!');

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});