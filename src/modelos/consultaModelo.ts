
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "",
  database: "kbd",
  port: 3306,
});

export async function getConsulta() {
  try {
    const [rows] = await pool.execute('SELECT * FROM consultas');
    return rows;
  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    throw new Error('Erro ao obter dados das consultas');
  }
}

export async function criarConsulta(
  paciente_id: number,
  medico_id: number,
  sala_id: string,
  data: string, 
  horario: string, 
) {
  if (!paciente_id || !medico_id || !sala_id || !data || !horario) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO consultas (paciente_id, medico_id, sala, data_id, horario) VALUES (?, ?, ?, ?, ?)',
      [paciente_id, medico_id, sala_id, data, horario]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    throw new Error('Erro ao inserir dados da consulta');
  }
}