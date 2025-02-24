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

export async function getSala() {
  try {
    const [rows] = await pool.execute('SELECT * FROM sala');
    return rows;
  } catch (error) {
    console.error('Erro ao obter salas:', error);
    throw new Error('Erro ao obter dados das salas');
  }
}

export async function criarSala(
  numero: string, 
  data: string,  
  horario: string, 
  status: string
) {
  if (!numero || !data || !horario || !status) {
    throw new Error('Campos obrigatórios não preenchidos');
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO sala (numero, data, horario, status) VALUES (?, ?, ?, ?)',
      [numero, data, horario, status]
    );
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    throw new Error('Erro ao inserir dados da sala');
  }
}