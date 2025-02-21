import { Request, Response } from 'express';
import * as SalaModel from '../modelos/salaModelo';
import { Sala } from '../models/Sala';


export async function getMedicos(req: Request, res: Response) {
    try {
      const sala = await SalaModel.getSala();
      res.json(Sala);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar médico' });
    }
  }