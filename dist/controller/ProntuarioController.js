var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ProntuarioModel from '../modelos/prontuarioModelo.js';
// Função para obter os alunos
export function getProntuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prontuario = yield ProntuarioModel.getProntuario();
            res.json(prontuario);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar prontuário' });
        }
    });
}
export function criarProntuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { paciente_id, historico } = req.body;
        // Verifica se todos os campos obrigatórios estão presentes
        if (!paciente_id || !historico) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
        }
        try {
            const result = yield ProntuarioModel.criarProntuario(paciente_id, historico);
            return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar prontuário' }); // 'return' aqui também
        }
    });
}
