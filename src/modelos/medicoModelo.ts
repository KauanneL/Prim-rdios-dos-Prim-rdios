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

export async function getMedico() {
  try {
    const [rows] = await pool.execute('SELECT * FROM medicos');
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
      'INSERT INTO medicos (nome, especialidade) VALUES (?, ?)',
      [nome, especialidade]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar médico:', error);
    throw new Error('Erro ao inserir dados do médico');
  }
}