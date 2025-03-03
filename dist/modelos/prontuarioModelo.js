var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "kbd",
    port: 3306,
});
export function getProntuario() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM prontuarios');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter prontuário:', error);
            throw new Error('Erro ao obter dados do prontuário');
        }
    });
}
export function criarProntuario(paciente_nome, histórico) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!paciente_nome || !histórico) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO prontuarios (paciente, histórico) VALUES (?, ?)', [paciente_nome, histórico]);
            return { insertId: result.insertId };
        }
        catch (error) {
            console.error('Erro ao criar prontuário:', error);
            throw new Error('Erro ao inserir dados do prontuário');
        }
    });
}
