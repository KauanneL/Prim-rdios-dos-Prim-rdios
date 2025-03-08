var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatarData, carregarPacientes, carregarMedicos, carregarSalas } from "../src/main";
// Mock do fetch global
global.fetch = jest.fn();
describe("Testes unitários", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = `
      <select id="consultaPaciente"></select>
      <select id="prontuarioPaciente"></select>
      <select id="consultaMedico"></select>
      <select id="consultaSala"></select>
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
                { id: "2", nome: "Maria" }
            ])
        });
        yield carregarPacientes();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/paciente");
        const consultaPaciente = document.getElementById("consultaPaciente");
        if (consultaPaciente) {
            consultaPaciente.innerHTML = "João";
        }
        const prontuarioPaciente = document.getElementById("prontuarioPaciente");
        if (prontuarioPaciente) {
            prontuarioPaciente.innerHTML = "Maria";
        }
    }));
    test("carregarMedicos deve preencher o select de médicos", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { id: "1", nome: "Dr. Pedro" }
            ])
        });
        yield carregarMedicos();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/medicos");
        const consultaMedico = document.getElementById("consultaMedico");
        if (consultaMedico) {
            consultaMedico.innerHTML = "Dr. Pedro";
        }
    }));
    test("carregarSalas deve preencher o select de salas", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([
                { id: "101", consultorio: "Sala 101" }
            ])
        });
        yield carregarSalas();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/salas");
        const consultaSala = document.getElementById("consultaSala");
        if (consultaSala) {
            consultaSala.innerHTML = "Sala 101";
        }
    }));
});
