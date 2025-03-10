import mysql from 'mysql2/promise';
export declare function getConsulta(): Promise<mysql.QueryResult>;
export declare function criarConsulta(paciente_nome: string, // Nome do paciente.
medico_nome: string, // Nome do Médico
sala_consultorio: string, // Sala que será a consulta
data: string, // Data da Consulta
horario: string): Promise<{
    insertId: number;
}>;
