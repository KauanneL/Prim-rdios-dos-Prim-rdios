import { Request, Response } from 'express';
import * as SalaModel from '../modelos/salaModelo';


export async function getMedicos(req: Request, res: Response) {
    try {
      const sala = await SalaModel.getSala();
      res.json(sala);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar médico' });
    }
  }

  export async function criarSala(req: Request, res: Response): Promise<any> {
    const { numero, data, horario, status } = req.body;
  
    // Verifica se todos os campos obrigatórios estão presentes
    if (!numero || !data || !horario || !status) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
    }
  
    try {
      const result = await SalaModel.criarSala(numero, data, horario, status);
      return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar sala' }); // 'return' aqui também
    }
  }