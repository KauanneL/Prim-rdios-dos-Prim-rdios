var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatarData, carregarPacientes, carregarMedicos, carregarSalas, carregarConsultasAgendadas, carregarPacientesProntuarios, carregarOcupacaoSalas, } from "../src/main";
// Mock do fetch global
global.fetch = jest.fn();
describe("Testes unitários das funções", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = `
      <select id="consultaPaciente"></select>
      <select id="prontuarioPaciente"></select>
      <select id="consultaMedico"></select>
      <select id="consultaSala"></select>
      <table><tbody id="consultasAgendadasList"></tbody></table>
      <table><tbody id="pacientesProntuariosList"></tbody></table>
      <table><tbody id="salasList"></tbody></table>
    `;
    });
    test("formatarData deve retornar data formatada corretamente", () => {
        const dataISO = "2025-03-07T00:00:00Z";
        expect(formatarData(dataISO)).toBe("07/03/2025");
    });
    test("carregarPacientes deve preencher os selects corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { id: "1", nome: "João" },
                { id: "2", nome: "Maria" },
            ]),
        });
        yield carregarPacientes();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/paciente");
    }));
    test("carregarMedicos deve preencher o select de médicos", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([{ id: "1", nome: "Dr. Pedro" }]),
        });
        yield carregarMedicos();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/medicos");
    }));
    test("carregarSalas deve preencher o select de salas", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([{ id: "101", consultorio: "Sala 101" }]),
        });
        yield carregarSalas();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/salas");
    }));
    test("carregarConsultasAgendadas deve preencher a tabela corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                {
                    paciente_nome: "João",
                    medico_nome: "Dr. Pedro",
                    data: "2025-03-07",
                    horario: "10:00",
                    sala_consultorio: "Sala 101",
                },
            ]),
        });
        yield carregarConsultasAgendadas();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/consultas");
    }));
    test("carregarPacientesProntuarios deve preencher a tabela corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { paciente_nome: "João", histórico: "Paciente com dor de cabeça." },
            ]),
        });
        yield carregarPacientesProntuarios();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/prontuarios");
    }));
    test("carregarOcupacaoSalas deve preencher a tabela corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { id: 101, consultorio: "Sala 101" },
            ]),
        });
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { sala_consultorio: "Sala 101", data: "2025-03-07", horario: "10:00" },
            ]),
        });
        yield carregarOcupacaoSalas();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/salas");
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/consultas");
    }));
});
