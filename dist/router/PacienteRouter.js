import express from 'express';
import * as pacienteController from '../controller/PacienteController.js';
const router = express.Router();
router.get('/', pacienteController.getPaciente);
router.post('/', pacienteController.criarPaciente);
export default router;
