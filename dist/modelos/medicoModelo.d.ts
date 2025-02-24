import mysql from 'mysql2/promise';
export declare function getMedico(): Promise<mysql.QueryResult>;
export declare function criarMedico(nome: string, especialidade: string): Promise<{
    insertId: number;
}>;
