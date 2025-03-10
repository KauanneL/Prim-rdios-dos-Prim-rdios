// Importamos os tipos 'Request' e 'Response' do Express para definir corretamente os parâmetros das funções.
import { Request, Response } from 'express';
// Importamos as funções do modelo 'consultaModelo.js' e atribuímos à variável 'ConsultaModel'.
// Isso nos permite chamar funções como 'ConsultaModel.getConsulta()' e 'ConsultaModel.criarConsulta()'.
import * as ConsultaModel from '../modelos/consultaModelo.js';
// Esta função vai buscar todas as consultas cadastradas no banco de dados.
export async function getConsulta(req: Request, res: Response) {
    try {
        // Chamamos a função 'getConsulta()' do modelo, que retorna a lista de consultas do banco.
      const consulta = await ConsultaModel.getConsulta();
        // Se a busca for bem-sucedida, enviamos as consultas como resposta em formato JSON.
      res.json(consulta);
    } catch (error) {
        // Se ocorrer um erro na busca, enviamos um código de status HTTP 500 (erro interno do servidor)
        // e uma mensagem informando que houve um problema.
      res.status(500).json({ message: 'Erro ao buscar consulta' });
    }
  }
  export async function criarConsulta(req: Request, res: Response): Promise<any> {
      // Extraímos os dados enviados pelo cliente no corpo da requisição (req.body).
    const { paciente_nome, medico_nome, sala_consultorio, data, horario } = req.body;
      // Verifica se todos os campos obrigatórios foram preenchidos.
    if (!paciente_nome || !medico_nome || !sala_consultorio || !data || !horario) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
    }
  
    try {
        // Chamamos a função 'criarConsulta' do modelo, passando os dados da consulta para serem inseridos no banco de dados.
      const result = await ConsultaModel.criarConsulta(paciente_nome, medico_nome, sala_consultorio, data, horario);
        // Se a consulta for cadastrada com sucesso, retornamos um código 201 (Created)
        // e enviamos o ID da nova consulta cadastrada.
      return res.status(201).json({ id: result.insertId });
    } catch (error) {
        // Se ocorrer um erro ao cadastrar a consulta, retornamos um código 500 e uma mensagem de erro.
      return res.status(500).json({ message: 'Erro ao criar consulta' }); 
    }
  }
