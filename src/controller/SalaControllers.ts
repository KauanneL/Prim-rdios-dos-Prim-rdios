import { Request, Response } from 'express';
import * as SalaModel from '../modelos/salaModelo.js';

export async function getSala(req: Request, res: Response) {
    try {
      const sala = await SalaModel.getSala();
      res.json(sala);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar médico' });
    }
  }

  export async function criarSala(req: Request, res: Response): Promise<any> {
    const { numero, data, horario, status } = req.body;
  
    if (!numero || !data || !horario || !status) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
    }
  
    try {
      const result = await SalaModel.criarSala(numero, data, horario, status);
      return res.status(201).json({ id: result.insertId }); 
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar sala' });
    }
  }
