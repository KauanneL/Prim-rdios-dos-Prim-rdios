import mysql from 'mysql2/promise';
export declare function getSala(): Promise<mysql.QueryResult>;
export declare function criarSala(numero: string, data: string, horario: string, status: string): Promise<{
    insertId: number;
}>;
