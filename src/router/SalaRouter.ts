import express from 'express';
import * as salaController from '../controller/SalaControllers.js';

const router = express.Router();

router.get('/', salaController.getSala);
router.post('/', salaController.criarSala);

export default router;