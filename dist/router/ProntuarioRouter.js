import express from 'express';
import * as prontuarioController from '../controller/ProntuarioController.js';
const router = express.Router();
router.get('/', prontuarioController.getProntuario);
export default router;
