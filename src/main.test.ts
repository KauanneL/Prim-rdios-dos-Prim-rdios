import {
  formatarData,
  carregarPacientes,
  carregarMedicos,
  carregarSalas,
  carregarConsultasAgendadas,
  carregarPacientesProntuarios,
  carregarOcupacaoSalas,
  configurarFormularios,
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
describe("Testes para configurarFormularios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <form id="pacienteForm">
        <input id="pacienteNome" type="text" />
        <input id="pacienteIdade" type="number" />
        <input id="pacienteTelefone" type="text" />
        <button type="submit">Cadastrar</button>
      </form>
      <form id="consultaForm">
        <select id="consultaPaciente"><option value="1">João</option></select>
        <select id="consultaMedico"><option value="1">Dr. Pedro</option></select>
        <select id="consultaSala"><option value="101">Sala 101</option></select>
        <input id="consultaData" type="date" />
        <input id="consultaHorario" type="time" />
        <button type="submit">Agendar</button>
      </form>
      <form id="prontuarioForm">
        <select id="prontuarioPaciente"><option value="1">João</option></select>
        <textarea id="prontuarioTexto"></textarea>
        <button type="submit">Salvar</button>
      </form>
    `;
  });

  test("Deve chamar a API ao submeter pacienteForm", async () => {
    configurarFormularios();
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    
    const form = document.getElementById("pacienteForm") as HTMLFormElement;
    (document.getElementById("pacienteNome") as HTMLInputElement).value = "Maria";
    (document.getElementById("pacienteIdade") as HTMLInputElement).value = "30";
    (document.getElementById("pacienteTelefone") as HTMLInputElement).value = "999999999";

    form.dispatchEvent(new Event("submit", { bubbles: true }));
    
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/paciente", expect.any(Object));
  });

  test("Deve exibir erro se a data da consulta for inválida", () => {
    configurarFormularios();
    const form = document.getElementById("consultaForm") as HTMLFormElement;
    (document.getElementById("consultaData") as HTMLInputElement).value = "2000-01-01";

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(alertMock).toHaveBeenCalledWith("A data da consulta não pode ser anterior à data atual.");
    alertMock.mockRestore();
  });

  test("Deve chamar a API ao submeter prontuarioForm", async () => {
    configurarFormularios();
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    
    const form = document.getElementById("prontuarioForm") as HTMLFormElement;
    (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value = "Histórico de saúde";

    form.dispatchEvent(new Event("submit", { bubbles: true }));
    
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/prontuarios", expect.any(Object));
  });
});
