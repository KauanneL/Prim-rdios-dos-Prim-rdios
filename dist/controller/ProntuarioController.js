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
        const { paciente_nome, histórico } = req.body;
        if (!paciente_nome || !histórico) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const result = yield ProntuarioModel.criarProntuario(paciente_nome, histórico);
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar prontuário' });
        }
    });
}
