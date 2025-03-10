//Possibilitar a importação e utilização das funções do modelo dentro do controlador,
//Permitindo que o controller se comunique com o banco de dados através das funções definidas no modelo.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importamos as funções do modelo 'consultaModelo.js' e atribuímos à variável 'ConsultaModel'.
// Isso nos permite chamar funções como 'ConsultaModel.getConsulta()' e 'ConsultaModel.criarConsulta()'.
import * as ConsultaModel from '../modelos/consultaModelo.js';
// Esta função vai buscar todas as consultas cadastradas no banco de dados.
export function getConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Chamamos a função 'getConsulta()' do modelo, que retorna a lista de consultas do banco.
            const consulta = yield ConsultaModel.getConsulta();
            // Se a busca for bem-sucedida, enviamos as consultas como resposta em formato JSON.
            res.json(consulta);
        }
        catch (error) {
            // Se ocorrer um erro na busca, enviamos um código de status HTTP 500 (erro interno do servidor)
            // e uma mensagem informando que houve um erro ao buscar as consultas.
            res.status(500).json({ message: 'Erro ao buscar consulta' });
        }
    });
}
export function criarConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extraímos os dados enviados pelo paciente no corpo da requisição.
        const { paciente_nome, medico_nome, sala_consultorio, data, horario } = req.body;
        // Verifica se todos os campos obrigatórios foram preenchidos.
        if (!paciente_nome || !medico_nome || !sala_consultorio || !data || !horario) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            // Chamamos a função 'criarConsulta' do modelo, passando os dados da consulta para serem inseridos no banco de dados.
            const result = yield ConsultaModel.criarConsulta(paciente_nome, medico_nome, sala_consultorio, data, horario);
            // Se a consulta for cadastrada com sucesso, retornamos um código 201 (Created)
            // e enviamos o ID da nova consulta cadastrada.
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            // Se ocorrer um erro ao cadastrar a consulta, retornamos um código 500 e uma mensagem.
            return res.status(500).json({ message: 'Erro ao criar consulta' });
        }
    });
}
