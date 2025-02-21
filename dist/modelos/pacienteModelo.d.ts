import mysql from 'mysql2/promise';
export declare function getPaciente(): Promise<mysql.QueryResult>;
export declare function criarPaciente(nome: string, idade: number, telefone: string): Promise<{
    insertId: number;
}>;
