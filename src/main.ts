document.addEventListener("DOMContentLoaded", () => {
  carregarPacientes();
  carregarMedicos();
  carregarSalas();
  configurarFormularios();
});

async function carregarPacientes() {
  try {
    const response = await fetch("http://localhost:3000/api/paciente");
    if (!response.ok) throw new Error("Erro ao carregar pacientes");
    const pacientes = await response.json();
    
    const selectPaciente = document.getElementById("consultaPaciente") as HTMLSelectElement;
    const selectProntuario = document.getElementById("prontuarioPaciente") as HTMLSelectElement;
    selectPaciente.innerHTML = "<option value=''>Selecione o Paciente</option>";
    selectProntuario.innerHTML = "<option value=''>Selecione o Paciente</option>";
    
    pacientes.forEach((paciente: any) => {
      const option1 = new Option(paciente.nome, paciente.id);
      const option2 = new Option(paciente.nome, paciente.id);
      selectPaciente.add(option1);
      selectProntuario.add(option2);
    });
  } catch (error) {
    console.error("Erro ao carregar pacientes:", error);
  }
}

async function carregarMedicos() {
  try {
    const response = await fetch("http://localhost:3000/api/medicos");
    if (!response.ok) throw new Error("Erro ao carregar médicos");
    const medicos = await response.json();
    
    const selectMedico = document.getElementById("consultaMedico") as HTMLSelectElement;
    selectMedico.innerHTML = "<option value=''>Selecione o Médico</option>";
    
    medicos.forEach((medico: any) => {
      const option = new Option(medico.nome, medico.id);
      selectMedico.add(option);
    });
  } catch (error) {
    console.error("Erro ao carregar médicos:", error);
  }
}

async function carregarSalas() {
  try {
    const response = await fetch("http://localhost:3000/api/salas");
    if (!response.ok) throw new Error("Erro ao carregar salas");
    const salas = await response.json();
    
    const selectSala = document.getElementById("consultaSala") as HTMLSelectElement;
    selectSala.innerHTML = "<option value=''>Selecione a Sala</option>";
    
    salas.forEach((sala: any) => {
      const option = new Option(sala.nome, sala.id);
      selectSala.add(option);
    });
  } catch (error) {
    console.error("Erro ao carregar salas:", error);
  }
}

function configurarFormularios() {
  const pacienteForm = document.getElementById("pacienteForm") as HTMLFormElement;
  pacienteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = (document.getElementById("pacienteNome") as HTMLInputElement).value;
    const idade = (document.getElementById("pacienteIdade") as HTMLInputElement).value;
    const telefone = (document.getElementById("pacienteTelefone") as HTMLInputElement).value;
    
    await fetch("http://localhost:3000/api/paciente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade, telefone })
    });
    pacienteForm.reset();
    await carregarPacientes();
  });

  const consultaForm = document.getElementById("consultaForm") as HTMLFormElement;
  consultaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const pacienteId = (document.getElementById("consultaPaciente") as HTMLSelectElement).value;
    const medicoId = (document.getElementById("consultaMedico") as HTMLSelectElement).value;
    const salaId = (document.getElementById("consultaSala") as HTMLSelectElement).value;
    const data = (document.getElementById("consultaData") as HTMLInputElement).value;
    const horario = (document.getElementById("consultaHorario") as HTMLInputElement).value;
    
    await fetch("http://localhost:3000/api/consultas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pacienteId, medicoId, salaId, data, horario })
    });
    consultaForm.reset();
  });

  const prontuarioForm = document.getElementById("prontuarioForm") as HTMLFormElement;
  prontuarioForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const pacienteId = (document.getElementById("prontuarioPaciente") as HTMLSelectElement).value;
    const texto = (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value;
    
    await fetch("http://localhost:3000/api/prontuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pacienteId, texto })
    });
    prontuarioForm.reset();
  });
}

