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
  export async function criarProntuario(req: Request, res: Response): Promise<any> {
    const { paciente, histórico } = req.body;
  
    // Verifica se todos os campos obrigatórios estão presentes
    if (!paciente || !histórico) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
    }
  
    try {
      const result = await ProntuarioModel.criarProntuario(paciente, histórico);
      return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar prontuário' }); // 'return' aqui também
    }
  }