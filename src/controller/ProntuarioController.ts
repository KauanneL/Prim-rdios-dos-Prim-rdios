import { Request, Response } from 'express';
import * as ProntuarioModel from '../modelos/prontuarioModelo.js';


// Função para obter os alunos
export async function getProntuario(req: Request, res: Response) {
    try {
      const prontuario = await ProntuarioModel.getProntuario();
      res.json(prontuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar prontuário' });
    }
  }