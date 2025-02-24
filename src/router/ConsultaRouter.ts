import express from 'express';
import * as ConsultaController from '../controller/ConsultaController.js';

const router = express.Router();

router.get('/', ConsultaController.getConsulta);
router.post('/', ConsultaController.criarConsulta);

export default router;