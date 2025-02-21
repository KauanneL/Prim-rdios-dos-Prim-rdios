import { Request, Response } from 'express';
import * as ConsultaModel from '../modelos/consultaModelo';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
    try {
      const medico = await ConsultaModel.getConsulta();
      res.json(medico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar consulta' });
    }
  }