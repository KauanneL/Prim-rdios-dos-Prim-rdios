import mysql from 'mysql2/promise';
export declare function getProntuario(): Promise<mysql.QueryResult>;
export declare function criarProntuario(paciente_id: number, historico: string): Promise<{
    insertId: number;
}>;
