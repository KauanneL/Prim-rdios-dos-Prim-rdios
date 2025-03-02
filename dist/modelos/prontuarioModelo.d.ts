import mysql from 'mysql2/promise';
export declare function getProntuario(): Promise<mysql.QueryResult>;
export declare function criarProntuario(paciente_nome: string, histórico: string): Promise<{
    insertId: number;
}>;
