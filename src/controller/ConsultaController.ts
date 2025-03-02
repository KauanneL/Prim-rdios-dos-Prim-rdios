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
  export async function criarConsulta(req: Request, res: Response): Promise<any> {
    const { paciente_id, medico_id, sala_id, data, horario } = req.body;
  
    // Verifica se todos os campos obrigatórios estão presentes
    if (!paciente_id || !medico_id || !sala_id || !data || !horario) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
    }
  
    try {
      const result = await ConsultaModel.criarConsulta(paciente_id, medico_id, sala_id, data, horario);
      return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar consulta' }); // 'return' aqui também
    }
  }