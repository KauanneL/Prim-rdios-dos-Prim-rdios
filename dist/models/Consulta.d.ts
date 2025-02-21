import { Paciente } from "./Paciente.js";
import { Medico } from "./Medico.js";
export declare class Consulta {
    paciente: Paciente;
    medico: Medico;
    sala: string;
    data: string;
    horario: string;
    constructor(paciente: Paciente, medico: Medico, sala: string, data: string, horario: string);
}
