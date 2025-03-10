// importamos três bibliotecas importantes:

// Importa a biblioteca `mysql2/promise` para permitir conexões assíncronas com o MySQL.
import mysql from 'mysql2/promise';
// Importa a biblioteca `dotenv` para carregar variáveis de ambiente de um arquivo `.env`., ajundando a manter informações sensíveis (como credenciais do banco) fora do código.
import dotenv from 'dotenv';
// Importa `ResultSetHeader` do `mysql2`, que é usado para acessar o ID inserido após um INSERT.
import { ResultSetHeader } from 'mysql2';
// Carrega as variáveis de ambiente do arquivo `.env`.
dotenv.config();

//Criamos um pool de conexões com o banco de dados MySQL.
//Em vez de abrir uma nova conexão para cada requisição, o pool gerencia múltiplas conexões reutilizáveis, melhorando o desempenho.
const pool = mysql.createPool({
  host: 'localhost', // Define o servidor do banco de dados.
  user: "root",      // Nome de usuário do banco de dados.
  password: "",      // Senha do banco de dados (vazia por padrão, o que pode ser um risco de segurança).
  database: "kbd",   // Senha do banco de dados (vazia por padrão, o que pode ser um risco de segurança).
  port: 3306,        // Porta do MySQL (3306 é o padrão).
});
// Função assícrona para obter todas as consultas do banco de dados.
export async function getConsulta() {
  try {
    // Executa a consulta SQL para selecionar todas as colunas da tabela `consultas`.
    const [rows] = await pool.execute('SELECT * FROM consultas');
    // Retorna as linhas obtidas do banco de dados.
    return rows;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem no console.
    console.error('Erro ao obter consultas:', error);
    // Lança um erro para ser tratado
    throw new Error('Erro ao obter dados das consultas');
  }
}
// Função assíncrona para criar uma nova consulta no banco de dados.
export async function criarConsulta(
  paciente_nome: string,     // Nome do paciente.
  medico_nome: string,       // Nome do Médico
  sala_consultorio: string,  // Sala que será a consulta
  data: string,              // Data da Consulta
  horario: string,           // Horário da consulta
) {
  // Verifica se todos os campos obrigatórios foram preenchidos.
  if (!paciente_nome || !medico_nome || !sala_consultorio || !data || !horario) {
    throw new Error('Campos obrigatórios não preenchidos'); // Lança um erro se algum campo estiver ausente.
  }
  try {
    // Executa a consulta SQL para inserir uma nova consulta na tabela `consultas`.
    const [result] = await pool.execute(
      'INSERT INTO consultas (paciente_nome, medico_nome, sala_consultorio, data, horario) VALUES (?, ?, ?, ?, ?)',
      [paciente_nome, medico_nome, sala_consultorio, data, horario] // Passa os valores de forma segura, evitando SQL Injection.
    );
    // Retorna o ID da nova consulta inserida, acessando a propriedade `insertId` do `ResultSetHeader`.
    return { insertId: (result as ResultSetHeader).insertId };
  } catch (error) {
    // Em caso de erro, exibe uma mensagem no console.
    console.error('Erro ao criar consulta:', error);
    // Lança um erro para ser tratado no código que chamar essa função.
    throw new Error('Erro ao inserir dados da consulta');
  }
}
