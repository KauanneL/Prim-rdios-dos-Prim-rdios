document.addEventListener("DOMContentLoaded", () => {
  configurarFormularios();
  carregarPacientes();
  carregarMedicos();
  carregarSalas();
  carregarConsultasAgendadas();
  carregarOcupacaoSalas();
  carregarPacientesProntuarios();
});
function formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR'); 
}
async function carregarPacientes(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/paciente");
        if (!response.ok) throw new Error("Erro ao carregar pacientes");

        const pacientes: { id: string; nome: string }[] = await response.json();

        const selectPaciente = document.getElementById("consultaPaciente") as HTMLSelectElement;
        const selectProntuario = document.getElementById("prontuarioPaciente") as HTMLSelectElement;

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
    } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
    }
}
async function carregarMedicos(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/medicos");
        if (!response.ok) throw new Error("Erro ao carregar médicos");

        const medicos: { id: string; nome: string }[] = await response.json();

        const selectMedico = document.getElementById("consultaMedico") as HTMLSelectElement;
        if (!selectMedico) throw new Error("Elemento select de médicos não encontrado.");

        selectMedico.innerHTML = "<option value=''>Selecione o Médico</option>";

        medicos.forEach((medico) => {
            const option = new Option(medico.nome, medico.id);
            selectMedico.add(option);
        });
    } catch (error) {
        console.error("Erro ao carregar médicos:", error);
    }
}
async function carregarSalas(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/salas");
        if (!response.ok) throw new Error("Erro ao carregar salas");

        const salas: { id: string; consultorio: string }[] = await response.json();

        const selectSala = document.getElementById("consultaSala") as HTMLSelectElement;
        if (!selectSala) throw new Error("Elemento select de salas não encontrado.");

        selectSala.innerHTML = "<option value=''>Selecione a Sala</option>";

        salas.forEach((sala) => {
            const option = new Option(sala.consultorio, sala.id);
            selectSala.add(option);
        });
    } catch (error) {
        console.error("Erro ao carregar salas:", error);
    }
}
function configurarFormularios(): void {
    const pacienteForm = document.getElementById("pacienteForm") as HTMLFormElement;
    pacienteForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nome = (document.getElementById("pacienteNome") as HTMLInputElement).value;
        const idade = (document.getElementById("pacienteIdade") as HTMLInputElement).value;
        const telefone = (document.getElementById("pacienteTelefone") as HTMLInputElement).value;
        
        try {
            const response = await fetch("http://localhost:3000/api/paciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, idade, telefone }),
            });
            
            if (!response.ok) throw new Error("Erro ao cadastrar paciente");
            
            pacienteForm.reset();
            await carregarPacientes();
            console.log("Paciente cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar paciente:", error);
        }
    });

    const consultaForm = document.getElementById("consultaForm") as HTMLFormElement;
    consultaForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectPaciente = document.getElementById("consultaPaciente") as HTMLSelectElement;
        const paciente_nome = selectPaciente.options[selectPaciente.selectedIndex].text;

        const selectMedico = document.getElementById("consultaMedico") as HTMLSelectElement;
        const medico_nome = selectMedico.options[selectMedico.selectedIndex].text;

        const selectSala = document.getElementById("consultaSala") as HTMLSelectElement;
        const sala_consultorio = selectSala.options[selectSala.selectedIndex].text;

        const data = (document.getElementById("consultaData") as HTMLInputElement).value;
        const horario = (document.getElementById("consultaHorario") as HTMLInputElement).value;

        const hoje = new Date().toISOString().split("T")[0];
        if (data < hoje) {
            alert("A data da consulta não pode ser anterior à data atual.");
            return;
        }

        try {
            const responseConsultas = await fetch("http://localhost:3000/api/consultas");
            if (!responseConsultas.ok) throw new Error("Erro ao carregar consultas");
            const consultas: { sala_consultorio: string; data: string; horario: string }[] = await responseConsultas.json();

            const conflito = consultas.some(
                (consulta) => consulta.sala_consultorio === sala_consultorio && 
                              consulta.data === data && 
                              consulta.horario === horario
            );

            if (conflito) {
                alert("Já existe uma consulta agendada para essa sala nesse horário.");
                return;
            }
            
            const response = await fetch("http://localhost:3000/api/consultas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_nome, medico_nome, sala_consultorio, data, horario }),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar consulta");

            consultaForm.reset();
            console.log("Consulta agendada com sucesso!");
            carregarConsultasAgendadas();
            carregarOcupacaoSalas();
        } catch (error) {
            console.error("Erro ao agendar consulta:", error);
        }
    });

    const prontuarioForm = document.getElementById("prontuarioForm") as HTMLFormElement;
    prontuarioForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const selectPaciente = document.getElementById("prontuarioPaciente") as HTMLSelectElement;
        const paciente_nome = selectPaciente.options[selectPaciente.selectedIndex].text;
        
        const histórico = (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value;
        
        try {
            const response = await fetch("http://localhost:3000/api/prontuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paciente_nome, histórico }),
            });
            
            if (!response.ok) throw new Error("Erro ao cadastrar prontuário");
            
            prontuarioForm.reset();
            console.log("Prontuário registrado com sucesso!");
            carregarPacientesProntuarios();
        } catch (error) {
            console.error("Erro ao cadastrar prontuário:", error);
        }
    });
}
async function carregarConsultasAgendadas(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/consultas");
        if (!response.ok) throw new Error("Erro ao carregar consultas agendadas");

        const consultas: { 
            paciente_nome: string; 
            medico_nome: string; 
            data: string; 
            horario: string; 
            sala_consultorio: string;
        }[] = await response.json();

        const consultasList = document.getElementById("consultasAgendadasList") as HTMLTableSectionElement;
        if (!consultasList) throw new Error("Elemento de lista de consultas não encontrado.");

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
async function carregarPacientesProntuarios(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/prontuarios");
        if (!response.ok) throw new Error("Erro ao carregar prontuários");

        const prontuarios: { paciente_nome: string; histórico: string }[] = await response.json();

        const tbody = document.getElementById("pacientesProntuariosList") as HTMLTableSectionElement;
        if (!tbody) throw new Error("Elemento de lista de prontuários não encontrado.");

        tbody.innerHTML = "";

        const prontuariosAgrupados: Record<string, string[]> = {};

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

    } catch (error) {
        console.error("Erro ao carregar prontuários:", error);
    }
}
async function carregarOcupacaoSalas(): Promise<void> {
    try {
        const responseSalas = await fetch("http://localhost:3000/api/salas");
        if (!responseSalas.ok) throw new Error("Erro ao carregar salas");
        const salas: { id: number; consultorio: string }[] = await responseSalas.json();

        const responseConsultas = await fetch("http://localhost:3000/api/consultas");
        if (!responseConsultas.ok) throw new Error("Erro ao carregar consultas");
        const consultas: { sala_consultorio: string; data: string; horario: string }[] = await responseConsultas.json();

        const tbody = document.getElementById("salasList") as HTMLTableSectionElement;
        if (!tbody) throw new Error("Elemento de lista de salas não encontrado.");

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

    } catch (error) {
        console.error("Erro ao carregar ocupação de salas:", error);
    }
}
