import mysql from 'mysql2/promise';
export declare function getConsulta(): Promise<mysql.QueryResult>;
export declare function criarConsulta(paciente_nome: string, medico_nome: string, sala_consultorio: string, data: string, horario: string): Promise<{
    insertId: number;
}>;
