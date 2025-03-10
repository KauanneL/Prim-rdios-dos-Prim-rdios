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

export async function getPaciente() {
  try {
    const [rows] = await pool.execute('SELECT * FROM paciente');
    return rows;
  } catch (error) {
    console.error('Erro ao obter paciente:', error);
    throw new Error('Erro ao obter dados dos paciente');
  }
}
export async function criarPaciente(
  nome: string,
  idade:number,
  telefone:string
) {
  
  if (!nome || !idade || !telefone) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO paciente (nome,idade,telefone) VALUES (?, ?, ?)',
      [nome, idade,telefone]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; 
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    throw new Error('Erro ao inserir dados do paciente');
  }
}
