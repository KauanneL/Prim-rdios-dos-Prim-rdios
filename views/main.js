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
    carregarPacientesProntuarios();
    carregarOcupacaoSalas();
});
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR'); // Converte para "dd/mm/yyyy"
}
function validarDataFutura(data) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataConsulta = new Date(data);
    return dataConsulta >= hoje;
}

async function verificarDisponibilidadeConsulta(paciente_nome, medico_nome, sala_consultorio, data, horario) {
    try {
        const response = await fetch("http://localhost:3000/api/consultas");
        if (!response.ok) throw new Error("Erro ao carregar consultas agendadas");
        
        const consultas = await response.json();
        return !consultas.some(consulta =>
            consulta.paciente_nome === paciente_nome &&
            consulta.medico_nome === medico_nome &&
            consulta.sala_consultorio === sala_consultorio &&
            consulta.data === data &&
            consulta.horario === horario
        );
    } catch (error) {
        console.error("Erro ao verificar disponibilidade da consulta:", error);
        return false;
    }
}
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
        const selectPaciente = document.getElementById("consultaPaciente");
        const paciente_nome = selectPaciente.options[selectPaciente.selectedIndex].text;
        
        const selectMedico = document.getElementById("consultaMedico");
        const medico_nome = selectMedico.options[selectMedico.selectedIndex].text;
        
        const selectSala = document.getElementById("consultaSala");
        const sala_consultorio = selectSala.options[selectSala.selectedIndex].text;
        
        const data = document.getElementById("consultaData").value;
        const horario = document.getElementById("consultaHorario").value;
        try {
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
                <td>${consulta.paciente_nome}</td>
                <td>${consulta.medico_nome}</td>
                <td>${formatarData(consulta.data)}</td>
                <td>${consulta.horario}</td>
                <td>${consulta.sala_consultorio}</td>
            `;
            consultasList.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar consultas:", error);
    }
}
async function carregarPacientesProntuarios() {
    try {
        const response = await fetch("http://localhost:3000/api/prontuarios");
        if (!response.ok) throw new Error("Erro ao carregar prontuários");

        const prontuarios = await response.json();
        const tbody = document.getElementById("pacientesProntuariosList");
        tbody.innerHTML = "";

        prontuarios.forEach((prontuario) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${prontuario.paciente_nome}</td>
                <td>${prontuario.histórico}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao carregar prontuários:", error);
    }
}
async function carregarOcupacaoSalas() {
    try {
        // Buscar salas
        const responseSalas = await fetch("http://localhost:3000/api/salas");
        if (!responseSalas.ok) throw new Error("Erro ao carregar salas");
        const salas = await responseSalas.json();

        // Buscar consultas
        const responseConsultas = await fetch("http://localhost:3000/api/consultas");
        if (!responseConsultas.ok) throw new Error("Erro ao carregar consultas");
        const consultas = await responseConsultas.json();

        const tbody = document.getElementById("salasList");
        tbody.innerHTML = "";

        salas.forEach((sala) => {
            // Buscar todas as consultas associadas à sala
            const consultasSala = consultas.filter(c => c.sala_consultorio === sala.consultorio);

            // Se houver consultas, exibe todas
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

    } catch (error) {
        console.error("Erro ao carregar ocupação de salas:", error);
    }
}

