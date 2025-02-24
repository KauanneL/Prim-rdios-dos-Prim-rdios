var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as SalaModel from '../modelos/salaModelo.js';
export function getSala(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sala = yield SalaModel.getSala();
            res.json(sala);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar médico' });
        }
    });
}
export function criarSala(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { numero, data, horario, status } = req.body;
        // Verifica se todos os campos obrigatórios estão presentes
        if (!numero || !data || !horario || !status) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
        }
        try {
            const result = yield SalaModel.criarSala(numero, data, horario, status);
            return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar sala' }); // 'return' aqui também
        }
    });
}
