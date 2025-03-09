import {
  formatarData,
  carregarPacientes,
  carregarMedicos,
  carregarSalas,
  carregarConsultasAgendadas,
  carregarPacientesProntuarios,
  carregarOcupacaoSalas,
} from "../src/main";

// Mock do fetch global
global.fetch = jest.fn() as jest.Mock;

describe("Testes unitários", () => {
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

  test("carregarPacientes deve preencher os selects corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { id: "1", nome: "João" },
        { id: "2", nome: "Maria" },
      ]),
    });

    await carregarPacientes();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/paciente");
  });

  test("carregarMedicos deve preencher o select de médicos", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: "1", nome: "Dr. Pedro" }]),
    });

    await carregarMedicos();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/medicos");
  });

  test("carregarSalas deve preencher o select de salas", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: "101", consultorio: "Sala 101" }]),
    });

    await carregarSalas();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/salas");
  });

  test("carregarConsultasAgendadas deve preencher a tabela corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
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

    await carregarConsultasAgendadas();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/consultas");
  });

  test("carregarPacientesProntuarios deve preencher a tabela corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { paciente_nome: "João", histórico: "Paciente com dor de cabeça." },
      ]),
    });

    await carregarPacientesProntuarios();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/prontuarios");
  });

  test("carregarOcupacaoSalas deve preencher a tabela corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { id: 101, consultorio: "Sala 101" },
      ]),
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { sala_consultorio: "Sala 101", data: "2025-03-07", horario: "10:00" },
      ]),
    });

    await carregarOcupacaoSalas();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/salas");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/consultas");
  });
});
