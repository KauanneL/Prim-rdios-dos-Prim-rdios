import express from 'express';
import * as MedicoController from '../controller/MedicoController.js';
const router = express.Router();
router.get('/', MedicoController.getMedicos);
export default router;
