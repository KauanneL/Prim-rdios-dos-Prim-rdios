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
    carregarPacientes();
    carregarMedicos();
    carregarSalas();
    configurarFormularios();
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
                const option1 = new Option(paciente.nome, paciente.idade, paciente.numero);
                const option2 = new Option(paciente.nome, paciente.idade, paciente.numero);
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
                const option = new Option(medico.nome, medico.especialidade);
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
        const numero = document.getElementById("pacienteTelefone").value;
        yield fetch("http://localhost:3000/api/paciente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, idade, numero })
        });
        pacienteForm.reset();
        yield carregarPacientes();
    }));
    const consultaForm = document.getElementById("consultaForm");
    consultaForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const pacienteId = document.getElementById("consultaPaciente").value;
        const medicoId = document.getElementById("consultaMedico").value;
        const salaId = document.getElementById("consultaSala").value;
        const data = document.getElementById("consultaData").value;
        const horario = document.getElementById("consultaHorario").value;
        yield fetch("http://localhost:3000/api/consultas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pacienteId, medicoId, salaId, data, horario })
        });
        consultaForm.reset();
    }));
    const prontuarioForm = document.getElementById("prontuarioForm");
    prontuarioForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const paciente_Id = document.getElementById("prontuarioPaciente").value;
        const histórico = document.getElementById("prontuarioTexto").value;
        yield fetch("http://localhost:3000/api/prontuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paciente_Id, histórico })
        });
        prontuarioForm.reset();
    }));
}
