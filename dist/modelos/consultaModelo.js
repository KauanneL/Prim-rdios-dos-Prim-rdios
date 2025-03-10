// importamos três bibliotecas importantes:
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importa a biblioteca `mysql2/promise` para permitir conexões assíncronas com o MySQL.
import mysql from 'mysql2/promise';
// Importa a biblioteca `dotenv` para carregar variáveis de ambiente de um arquivo `.env`.
// Ajundando a manter informações sensíveis (como credenciais do banco) fora do código.
import dotenv from 'dotenv';
// Carrega as variáveis de ambiente do arquivo `.env`.
dotenv.config();
//Criamos um pool de conexões com o banco de dados MySQL.
//Em vez de abrir uma nova conexão para cada requisição, o pool gerencia múltiplas conexões reutilizáveis, melhorando o desempenho.
const pool = mysql.createPool({
    host: 'localhost', // Define o servidor do banco de dados.
    user: "root", // Nome de usuário do banco de dados.
    password: "", // Senha do banco de dados (vazia por padrão, o que pode ser um risco de segurança).
    database: "kbd", // Senha do banco de dados (vazia por padrão, o que pode ser um risco de segurança).
    port: 3306, // Porta do MySQL (3306 é o padrão).
});
// Função assícrona para obter todas as consultas do banco de dados.
export function getConsulta() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Executa a consulta SQL para selecionar todas as colunas da tabela `consultas`.
            const [rows] = yield pool.execute('SELECT * FROM consultas');
            // Retorna as linhas obtidas do banco de dados.
            return rows;
        }
        catch (error) {
            // Em caso de erro, exibe uma mensagem no console.
            console.error('Erro ao obter consultas:', error);
            // Lança um erro para ser tratado
            throw new Error('Erro ao obter dados das consultas');
        }
    });
}
// Função assíncrona para criar uma nova consulta no banco de dados.
export function criarConsulta(paciente_nome, // Nome do paciente.
medico_nome, // Nome do Médico
sala_consultorio, // Sala que será a consulta
data, // Data da Consulta
horario) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifica se todos os campos obrigatórios foram preenchidos.
        if (!paciente_nome || !medico_nome || !sala_consultorio || !data || !horario) {
            throw new Error('Campos obrigatórios não preenchidos'); // Lança um erro se algum campo estiver ausente.
        }
        try {
            // Executa a consulta SQL para inserir uma nova consulta na tabela `consultas`.
            const [result] = yield pool.execute('INSERT INTO consultas (paciente_nome, medico_nome, sala_consultorio, data, horario) VALUES (?, ?, ?, ?, ?)', [paciente_nome, medico_nome, sala_consultorio, data, horario] // Passa os valores de forma segura, evitando SQL Injection.
            );
            // Retorna o ID da nova consulta inserida, acessando a propriedade `insertId` do `ResultSetHeader`.
            return { insertId: result.insertId };
        }
        catch (error) {
            // Em caso de erro, exibe uma mensagem no console.
            console.error('Erro ao criar consulta:', error);
            // Lança um erro para ser tratado no código que chamar essa função.
            throw new Error('Erro ao inserir dados da consulta');
        }
    });
}
