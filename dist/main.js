var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    configurarFormularios();
    carregarPacientes();
    carregarMedicos();
    carregarSalas();
    carregarConsultasAgendadas();
    carregarOcupacaoSalas();
    carregarPacientesProntuarios();
});
export function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}
export function carregarPacientes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/paciente");
            if (!response.ok)
                throw new Error("Erro ao carregar pacientes");
            const pacientes = yield response.json();
            const selectPaciente = document.getElementById("consultaPaciente");
            const selectProntuario = document.getElementById("prontuarioPaciente");
            if (!selectPaciente || !selectProntuario) {
                throw new Error("Elementos select não encontrados na página.");
            }
            selectPaciente.innerHTML = "<option value=''>Selecione o Paciente</option>";
            selectProntuario.innerHTML = "<option value=''>Selecione o Paciente</option>";
            pacientes.forEach((paciente) => {
                const option1 = new Option(paciente.nome, paciente.id);
                const option2 = new Option(paciente.nome, paciente.id);
                selectPaciente.add(option1);
                selectProntuario.add(option2);
            });
        }
        catch (error) {
            console.error("Erro ao carregar pacientes:", error);
        }
    });
}
export function carregarMedicos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/medicos");
            if (!response.ok)
                throw new Error("Erro ao carregar médicos");
            const medicos = yield response.json();
            const selectMedico = document.getElementById("consultaMedico");
            if (!selectMedico)
                throw new Error("Elemento select de médicos não encontrado.");
            selectMedico.innerHTML = "<option value=''>Selecione o Médico</option>";
            medicos.forEach((medico) => {
                const option = new Option(medico.nome, medico.id);
                selectMedico.add(option);
            });
        }
        catch (error) {
            console.error("Erro ao carregar médicos:", error);
        }
    });
}
export function carregarSalas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/salas");
            if (!response.ok)
                throw new Error("Erro ao carregar salas");
            const salas = yield response.json();
            const selectSala = document.getElementById("consultaSala");
            if (!selectSala)
                throw new Error("Elemento select de salas não encontrado.");
            selectSala.innerHTML = "<option value=''>Selecione a Sala</option>";
            salas.forEach((sala) => {
                const option = new Option(sala.consultorio, sala.id);
                selectSala.add(option);
            });
        }
        catch (error) {
            console.error("Erro ao carregar salas:", error);
        }
    });
}
export function configurarFormularios() {
    const pacienteForm = document.getElementById("pacienteForm");
    pacienteForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const nome = document.getElementById("pacienteNome").value;
        const idade = document.getElementById("pacienteIdade").value;
        const telefone = document.getElementById("pacienteTelefone").value;
        try {
            const response = yield fetch("http://localhost:3000/api/paciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, idade, telefone }),
            });
            if (!response.ok)
                throw new Error("Erro ao cadastrar paciente");
            pacienteForm.reset();
            yield carregarPacientes();
            console.log("Paciente cadastrado com sucesso!");
        }
        catch (error) {
            console.error("Erro ao cadastrar paciente:", error);
        }
    }));
    const consultaForm = document.getElementById("consultaForm");
    consultaForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const selectPaciente = document.getElementById("consultaPaciente");
        const paciente_nome = selectPaciente.options[selectPaciente.selectedIndex].text;
        const selectMedico = document.getElementById("consultaMedico");
        const medico_nome = selectMedico.options[selectMedico.selectedIndex].text;
        const selectSala = document.getElementById("consultaSala");
        const sala_consultorio = selectSala.options[selectSala.selectedIndex].text;
        const data = document.getElementById("consultaData").value;
        const horario = document.getElementById("consultaHorario").value;
        const hoje = new Date().toISOString().split("T")[0];
        if (data < hoje) {
            alert("A data da consulta não pode ser anterior à data atual.");
            return;
        }
        try {
            const responseConsultas = yield fetch("http://localhost:3000/api/consultas");
            if (!responseConsultas.ok)
                throw new Error("Erro ao carregar consultas");
            const consultas = yield responseConsultas.json();
            const conflito = consultas.some((consulta) => consulta.sala_consultorio === sala_consultorio &&
                consulta.data === data &&
                consulta.horario === horario);
            if (conflito) {
                alert("Já existe uma consulta agendada para essa sala nesse horário.");
                return;
            }
            const response = yield fetch("http://localhost:3000/api/consultas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_nome, medico_nome, sala_consultorio, data, horario }),
            });
            if (!response.ok)
                throw new Error("Erro ao cadastrar consulta");
            consultaForm.reset();
            console.log("Consulta agendada com sucesso!");
            carregarConsultasAgendadas();
            carregarOcupacaoSalas();
        }
        catch (error) {
            console.error("Erro ao agendar consulta:", error);
        }
    }));
    const prontuarioForm = document.getElementById("prontuarioForm");
    prontuarioForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const selectPaciente = document.getElementById("prontuarioPaciente");
        const paciente_nome = selectPaciente.options[selectPaciente.selectedIndex].text;
        const histórico = document.getElementById("prontuarioTexto").value;
        try {
            const response = yield fetch("http://localhost:3000/api/prontuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_nome, histórico }),
            });
            if (!response.ok)
                throw new Error("Erro ao cadastrar prontuário");
            prontuarioForm.reset();
            console.log("Prontuário registrado com sucesso!");
            carregarPacientesProntuarios();
        }
        catch (error) {
            console.error("Erro ao cadastrar prontuário:", error);
        }
    }));
}
export function carregarConsultasAgendadas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/consultas");
            if (!response.ok)
                throw new Error("Erro ao carregar consultas agendadas");
            const consultas = yield response.json();
            const consultasList = document.getElementById("consultasAgendadasList");
            if (!consultasList)
                throw new Error("Elemento de lista de consultas não encontrado.");
            consultasList.innerHTML = "";
            consultas.forEach((consulta, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${index + 1}</td>
                <td>${consulta.paciente_nome}</td>
                <td>${consulta.medico_nome}</td>
                <td>${formatarData(consulta.data)}</td>
                <td>${consulta.horario}</td>
                <td>${consulta.sala_consultorio}</td>
            `;
                consultasList.appendChild(row);
            });
        }
        catch (error) {
            console.error("Erro ao carregar consultas:", error);
        }
    });
}
export function carregarPacientesProntuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/prontuarios");
            if (!response.ok)
                throw new Error("Erro ao carregar prontuários");
            const prontuarios = yield response.json();
            const tbody = document.getElementById("pacientesProntuariosList");
            if (!tbody)
                throw new Error("Elemento de lista de prontuários não encontrado.");
            tbody.innerHTML = "";
            const prontuariosAgrupados = {};
            prontuarios.forEach((prontuario) => {
                if (!prontuariosAgrupados[prontuario.paciente_nome]) {
                    prontuariosAgrupados[prontuario.paciente_nome] = [];
                }
                prontuariosAgrupados[prontuario.paciente_nome].push(prontuario.histórico);
            });
            Object.keys(prontuariosAgrupados).forEach((paciente_nome) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${paciente_nome}</td>
                <td>
                    <ul>
                        ${prontuariosAgrupados[paciente_nome].map(hist => `<li>${hist}</li>`).join('')}
                    </ul>
                </td>
            `;
                tbody.appendChild(row);
            });
        }
        catch (error) {
            console.error("Erro ao carregar prontuários:", error);
        }
    });
}
export function carregarOcupacaoSalas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseSalas = yield fetch("http://localhost:3000/api/salas");
            if (!responseSalas.ok)
                throw new Error("Erro ao carregar salas");
            const salas = yield responseSalas.json();
            const responseConsultas = yield fetch("http://localhost:3000/api/consultas");
            if (!responseConsultas.ok)
                throw new Error("Erro ao carregar consultas");
            const consultas = yield responseConsultas.json();
            const tbody = document.getElementById("salasList");
            if (!tbody)
                throw new Error("Elemento de lista de salas não encontrado.");
            tbody.innerHTML = "";
            salas.forEach((sala) => {
                const consultasSala = consultas.filter(c => c.sala_consultorio === sala.consultorio);
                consultasSala.forEach((consulta) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${sala.id}</td>
                    <td>${sala.consultorio}</td>
                    <td>${formatarData(consulta.data)}</td>
                    <td>${consulta.horario}</td>
                    <td>Ocupada</td>
                `;
                    tbody.appendChild(row);
                });
            });
        }
        catch (error) {
            console.error("Erro ao carregar ocupação de salas:", error);
        }
    });
}
