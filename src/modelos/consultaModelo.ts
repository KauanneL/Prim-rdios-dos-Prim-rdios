
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import { Paciente } from '../models/Paciente';
import { Medico } from '../models/Medico';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getConsulta() {
  try {
    const [rows] = await pool.execute('SELECT * FROM consulta');
    return rows;
  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    throw new Error('Erro ao obter dados das consultas');
  }
}

export async function criarConsulta(
  paciente_id: Paciente,
  medico_id: Medico,
  sala: string,
  data: string, 
  horario: string, 
) {
  if (!paciente_id || !medico_id || !sala || !data || !horario) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO consulta (paciente_id, medico_id, sala, data, horario) VALUES (?, ?, ?, ?, ?)',
      [paciente_id, medico_id, sala, data, horario]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    throw new Error('Erro ao inserir dados da consulta');
  }
}