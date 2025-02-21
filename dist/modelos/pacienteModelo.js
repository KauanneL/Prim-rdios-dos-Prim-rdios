var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
dotenv.config();
// Criação da conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});
// Função para obter todos os alunos
export function getPaciente() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM paciente');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter paciente:', error);
            throw new Error('Erro ao obter dados dos paciente');
        }
    });
}
// Função para criar aluno
export function criarPaciente(nome, idade, telefone) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifique se algum valor é inválido antes de tentar inserir no banco
        if (!nome || !idade || !telefone) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO paciente (nome,idade,telefone) VALUES (?, ?, ?)', [nome, idade, telefone]);
            const insertId = result.insertId;
            return { insertId }; // Retorna o ID do aluno inserido
        }
        catch (error) {
            console.error('Erro ao criar paciente:', error);
            throw new Error('Erro ao inserir dados do paciente');
        }
    });
}
