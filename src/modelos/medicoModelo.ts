import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getMedico() {
  try {
    const [rows] = await pool.execute('SELECT * FROM medico');
    return rows;
  } catch (error) {
    console.error('Erro ao obter médicos:', error);
    throw new Error('Erro ao obter dados dos médicos');
  }
}

export async function criarMedico(
  nome: string, 
  especialidade: string, 
) {
  if (!nome || !especialidade) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO medico (nome, especialidade) VALUES (?, ?)',
      [nome, especialidade]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar médico:', error);
    throw new Error('Erro ao inserir dados do médico');
  }
}