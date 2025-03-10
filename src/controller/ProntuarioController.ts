import { Request, Response } from 'express';
import * as ProntuarioModel from '../modelos/prontuarioModelo.js';

export async function getProntuario(req: Request, res: Response) {
    try {
      const prontuario = await ProntuarioModel.getProntuario();
      res.json(prontuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar prontuário' });
    }
  }
  export async function criarProntuario(req: Request, res: Response): Promise<any> {
    const { paciente_nome, histórico } = req.body;
  
    if (!paciente_nome || !histórico) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
    }
  
    try {
      const result = await ProntuarioModel.criarProntuario(paciente_nome, histórico);
      return res.status(201).json({ id: result.insertId });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar prontuário' }); 
    }
  }
