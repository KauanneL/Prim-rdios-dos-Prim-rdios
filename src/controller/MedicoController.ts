import { Request, Response } from 'express';
import * as MedicoModel from '../modelos/medicoModelo.js';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
  try {
    const medico = await MedicoModel.getMedico();
    res.json(medico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médico' });
  }
}