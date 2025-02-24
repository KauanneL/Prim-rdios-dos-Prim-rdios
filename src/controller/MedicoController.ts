import { Request, Response } from 'express';
import * as MedicoModel from '../modelos/medicoModelo.js';

// Função para obter os alunos
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

  // Verifica se todos os campos obrigatórios estão presentes
  if (!nome || !especialidade) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
  }

  try {
    const result = await MedicoModel.criarMedico(nome, especialidade);
    return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar médico' }); // 'return' aqui também
  }
}