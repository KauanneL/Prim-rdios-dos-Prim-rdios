import { Request, Response } from 'express';
import * as ProntuarioModel from '../modelos/prontuarioModelo';
import { Prontuario } from '../models/Prontuario';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
    try {
      const prontuario = await ProntuarioModel.getProntuario();
      res.json(Prontuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar prontuário' });
    }
  }