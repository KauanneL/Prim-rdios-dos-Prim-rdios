import { Request, Response } from 'express';
import * as ConsultaModel from '../modelos/consultaModelo.js';

// Função para obter os alunos
export async function getConsulta(req: Request, res: Response) {
    try {
      const consulta = await ConsultaModel.getConsulta();
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar consulta' });
    }
  }