import { Request, Response } from 'express';
import * as SalaModel from '../modelos/salaModelo';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
    try {
      const medico = await SalaModel.getSala();
      res.json(medico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar médico' });
    }
  }