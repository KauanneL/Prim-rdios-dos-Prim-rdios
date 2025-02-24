import mysql from 'mysql2/promise';
export declare function getConsulta(): Promise<mysql.QueryResult>;
export declare function criarConsulta(paciente_id: number, medico_id: number, sala: string, data: string, horario: string): Promise<{
    insertId: number;
}>;
