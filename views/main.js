"use strict";
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
});
function carregarPacientes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/paciente");
            if (!response.ok)
                throw new Error("Erro ao carregar pacientes");
            const pacientes = yield response.json();
            const selectPaciente = document.getElementById("consultaPaciente");
            const selectProntuario = document.getElementById("prontuarioPaciente");
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
function carregarMedicos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/medicos");
            if (!response.ok)
                throw new Error("Erro ao carregar médicos");
            const medicos = yield response.json();
            const selectMedico = document.getElementById("consultaMedico");
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
function carregarSalas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/salas");
            if (!response.ok)
                throw new Error("Erro ao carregar salas");
            const salas = yield response.json();
            const selectSala = document.getElementById("consultaSala");
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
function configurarFormularios() {
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
        const paciente_id = document.getElementById("consultaPaciente").value;
        const medico_id = document.getElementById("consultaMedico").value;
        const sala_id = document.getElementById("consultaSala").value;
        const data = document.getElementById("consultaData").value;
        const horario = document.getElementById("consultaHorario").value;
        try {
            const response = yield fetch("http://localhost:3000/api/consultas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_id, medico_id, sala_id, data, horario }),
            });
            if (!response.ok)
                throw new Error("Erro ao cadastrar consulta");
            consultaForm.reset();
            console.log("Consulta agendada com sucesso!");
        }
        catch (error) {
            console.error("Erro ao agendar consulta:", error);
        }
    }));
    const prontuarioForm = document.getElementById("prontuarioForm");
    prontuarioForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const paciente_id = document.getElementById("prontuarioPaciente").value;
        const histórico = document.getElementById("prontuarioTexto").value;
        try {
            const response = yield fetch("http://localhost:3000/api/prontuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_id, histórico }),
            });
            if (!response.ok)
                throw new Error("Erro ao cadastrar prontuário");
            prontuarioForm.reset();
            console.log("Prontuário registrado com sucesso!");
        }
        catch (error) {
            console.error("Erro ao cadastrar prontuário:", error);
        }
    }));
}
async function carregarConsultasAgendadas() {
    try {
        const response = await fetch("http://localhost:3000/api/consultas");
        if (!response.ok) throw new Error("Erro ao carregar consultas agendadas");
        const consultas = await response.json();

        const consultasList = document.getElementById("consultasAgendadasList");
        consultasList.innerHTML = "";

        consultas.forEach((consulta, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${consulta.paciente.nome}</td>
                <td>${consulta.medico_id}</td>
                <td>${consulta.data}</td>
                <td>${consulta.horario}</td>
                <td>${consulta.sala_id}</td>
            `;
            consultasList.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar consultas:", error);
    }
}

