import { Request, Response } from 'express';
import * as ConsultaModel from '../modelos/consultaModelo.js';

export async function getConsulta(req: Request, res: Response) {
    try {
      const consulta = await ConsultaModel.getConsulta();
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar consulta' });
    }
  }
  export async function criarConsulta(req: Request, res: Response): Promise<any> {
    const { paciente_nome, medico_nome, sala_consultorio, data, horario } = req.body;
    if (!paciente_nome || !medico_nome || !sala_consultorio || !data || !horario) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
    }
  
    try {
      const result = await ConsultaModel.criarConsulta(paciente_nome, medico_nome, sala_consultorio, data, horario);
      return res.status(201).json({ id: result.insertId });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar consulta' }); 
    }
  }
