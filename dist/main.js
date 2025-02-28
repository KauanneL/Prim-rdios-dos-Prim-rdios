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
var _a;
function fetchPacientes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5500/api/paciente', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    });
}
function fetchMedicos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/medicos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    });
}
function fetchConsultas() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/consultas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    });
}
function fetchProntuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/prontuarios', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    });
}
function fetchSalas() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/salas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    });
}
function atualizarListaPacientes() {
    return __awaiter(this, void 0, void 0, function* () {
        const pacientes = yield fetchPacientes();
        const consultaPacienteSelect = document.getElementById("consultaPaciente");
        const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente");
        if (!consultaPacienteSelect || !prontuarioPacienteSelect)
            return;
        consultaPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
        prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
        pacientes.forEach((paciente) => {
            const optionConsulta = document.createElement("option");
            optionConsulta.value = paciente.id;
            optionConsulta.textContent = paciente.nome;
            consultaPacienteSelect.appendChild(optionConsulta);
            const optionProntuario = document.createElement("option");
            optionProntuario.value = paciente.id;
            optionProntuario.textContent = paciente.nome;
            prontuarioPacienteSelect.appendChild(optionProntuario);
        });
    });
}
function atualizarListaMedicos() {
    return __awaiter(this, void 0, void 0, function* () {
        const medicos = yield fetchMedicos();
        const consultaMedicoSelect = document.getElementById("consultaMedico");
        if (!consultaMedicoSelect)
            return;
        consultaMedicoSelect.innerHTML = `<option value="">Selecione o Médico</option>`;
        medicos.forEach((medico) => {
            const option = document.createElement("option");
            option.value = medico.id;
            option.textContent = medico.nome;
            consultaMedicoSelect.appendChild(option);
        });
    });
}
function atualizarListaProntuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente");
        if (!prontuarioPacienteSelect)
            return;
        prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
        const pacientes = yield fetchPacientes();
        pacientes.forEach((paciente) => {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;
            prontuarioPacienteSelect.appendChild(option);
        });
    });
}
function exibirPacientes() {
    return __awaiter(this, void 0, void 0, function* () {
        const pacientes = yield fetchPacientes();
        const pacienteList = document.getElementById("pacienteList");
        if (!pacienteList)
            return;
        pacienteList.innerHTML = pacientes
            .map((p) => `<p>${p.nome} - ${p.idade} anos - ${p.telefone}</p>`)
            .join("");
    });
}
function exibirConsultas() {
    return __awaiter(this, void 0, void 0, function* () {
        const consultas = yield fetchConsultas();
        const consultasAgendadasList = document.getElementById("consultasAgendadasList");
        if (!consultasAgendadasList)
            return;
        consultasAgendadasList.innerHTML = consultas
            .map((c, index) => `<tr><td>${index + 1}</td><td>${c.paciente.nome}</td><td>${c.medico.nome}</td><td>${c.data}</td><td>${c.horario}</td><td>${c.sala.numero}</td></tr>`)
            .join("");
    });
}
function exibirSalas() {
    return __awaiter(this, void 0, void 0, function* () {
        const salas = yield fetchSalas();
        const salasList = document.getElementById("salasList");
        if (!salasList)
            return;
        salasList.innerHTML = salas
            .map((s, index) => `<tr><td>${index + 1}</td><td>${s.numero}</td><td>${s.data}</td><td>${s.horario}</td><td>${s.status}</td></tr>`)
            .join("");
    });
}
function exibirProntuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        const prontuarios = yield fetchProntuarios();
        const pacientesProntuariosList = document.getElementById("pacientesProntuariosList");
        if (!pacientesProntuariosList)
            return;
        pacientesProntuariosList.innerHTML = prontuarios
            .map((p) => `<tr><td>${p.paciente.nome}</td><td>${p.historico.replace(/\n/g, "<br>")}</td></tr>`)
            .join("");
    });
}
(_a = document.getElementById("pacienteForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    event.preventDefault();
    const nome = (_a = document.getElementById("pacienteNome")) === null || _a === void 0 ? void 0 : _a.value;
    const idade = parseInt((_b = document.getElementById("pacienteIdade")) === null || _b === void 0 ? void 0 : _b.value);
    const telefone = (_c = document.getElementById("pacienteTelefone")) === null || _c === void 0 ? void 0 : _c.value;
    yield fetch("http://localhost:3000/api/paciente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, idade, telefone })
    });
    document.getElementById("pacienteNome").value = "";
    document.getElementById("pacienteIdade").value = "";
    document.getElementById("pacienteTelefone").value = "";
    atualizarListaPacientes();
    exibirPacientes();
}));
atualizarListaPacientes();
atualizarListaMedicos();
atualizarListaProntuarios();
exibirPacientes();
exibirConsultas();
exibirSalas();
exibirProntuarios();
