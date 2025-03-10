var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as MedicoModel from '../modelos/medicoModelo.js';
export function getMedicos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const medico = yield MedicoModel.getMedico();
            res.json(medico);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar médico' });
        }
    });
}
export function criarMedico(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, especialidade } = req.body;
        if (!nome || !especialidade) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const result = yield MedicoModel.criarMedico(nome, especialidade);
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar médico' });
        }
    });
}
