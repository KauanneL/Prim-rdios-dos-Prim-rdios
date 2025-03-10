import { Request, Response } from 'express';
import * as PacienteModel from '../modelos/pacientemodelo.js';

export async function getPaciente(req: Request, res: Response) {
  try {
    const paciente = await PacienteModel.getPaciente();
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar paciente' });
  }
}
export async function criarPaciente(req: Request, res: Response): Promise<any> {
  const { nome, idade,telefone } = req.body;

  if (!nome || !idade || !telefone) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  try {
    const result = await PacienteModel.criarPaciente(nome, idade,telefone);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {// 'return' aqui também
  }
}
