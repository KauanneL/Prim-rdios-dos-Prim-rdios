
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

export async function getProntuario() {
  try {
    const [rows] = await pool.execute('SELECT * FROM prontuarios');
    return rows;
  } catch (error) {
    console.error('Erro ao obter prontuário:', error);
    throw new Error('Erro ao obter dados do prontuário');
  }
}

export async function criarProntuario(
  paciente_id: number, 
  historico: string,
) {
  if (!paciente_id || !historico) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO prontuario (paciente_id, historico) VALUES (?, ?)',
      [paciente_id, historico]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    throw new Error('Erro ao inserir dados do prontuário');
  }
}