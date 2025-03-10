import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "",
  database: "kbd",
  port: 3306,
});

// Função para obter todos os alunos
export async function getPaciente() {
  try {
    const [rows] = await pool.execute('SELECT * FROM paciente');
    return rows;
  } catch (error) {
    console.error('Erro ao obter paciente:', error);
    throw new Error('Erro ao obter dados dos paciente');
  }
}

// Função para criar aluno
export async function criarPaciente(
  nome: string,
  idade:number,
  telefone:string
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!nome || !idade || !telefone) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO paciente (nome,idade,telefone) VALUES (?, ?, ?)',
      [nome, idade,telefone]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; // Retorna o ID do aluno inserido
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    throw new Error('Erro ao inserir dados do paciente');
  }
}
