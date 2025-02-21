import { Request, Response } from 'express';
import * as ProntuarioModel from '../modelos/prontuarioModelo';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
    try {
      const medico = await ProntuarioModel.getProntuario();
      res.json(medico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar prontuário' });
    }
  }