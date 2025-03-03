var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ConsultaModel from '../modelos/consultaModelo.js';
// Função para obter os alunos
export function getConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const consulta = yield ConsultaModel.getConsulta();
            res.json(consulta);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar consulta' });
        }
    });
}
export function criarConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { paciente, medico, sala, data, horario } = req.body;
        // Verifica se todos os campos obrigatórios estão presentes
        if (!paciente || !medico || !sala || !data || !horario) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
        }
        try {
            const result = yield ConsultaModel.criarConsulta(paciente, medico, sala, data, horario);
            return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar consulta' }); // 'return' aqui também
        }
    });
}
