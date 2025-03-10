import { Request, Response } from 'express';
import * as MedicoModel from '../modelos/medicoModelo.js';

export async function getMedicos(req: Request, res: Response) {
  try {
    const medico = await MedicoModel.getMedico();
    res.json(medico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médico' });
  }
}
export async function criarMedico(req: Request, res: Response): Promise<any> {
  const { nome, especialidade } = req.body;

  if (!nome || !especialidade) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await MedicoModel.criarMedico(nome, especialidade);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar médico' }); 
  }
}
