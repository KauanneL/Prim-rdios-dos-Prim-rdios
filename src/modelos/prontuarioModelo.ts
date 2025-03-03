
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
  paciente_nome: string, 
  histórico: string,
) {
  if (!paciente_nome || !histórico) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO prontuarios (paciente, histórico) VALUES (?, ?)',
      [paciente_nome, histórico]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    throw new Error('Erro ao inserir dados do prontuário');
  }
}