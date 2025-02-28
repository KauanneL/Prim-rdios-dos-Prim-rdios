async function fetchPacientes(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/paciente');
  return response.json();
}

async function fetchMedicos(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/medicos');
  return response.json();
}

async function fetchConsultas(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/consultas');
  return response.json();
}

async function fetchProntuarios(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/prontuarios');
  return response.json();
}

async function fetchSalas(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/salas');
  return response.json();
}

async function atualizarListaPacientes() {
  const pacientes = await fetchPacientes();
  const consultaPacienteSelect = document.getElementById("consultaPaciente") as HTMLSelectElement | null;
  const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente") as HTMLSelectElement | null;

  if (!consultaPacienteSelect || !prontuarioPacienteSelect) return;

  consultaPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
  prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;

  pacientes.forEach((paciente: { id: string; nome: string }) => {
    const optionConsulta = document.createElement("option");
    optionConsulta.value = paciente.id;
    optionConsulta.textContent = paciente.nome;
    consultaPacienteSelect.appendChild(optionConsulta);

    const optionProntuario = document.createElement("option");
    optionProntuario.value = paciente.id;
    optionProntuario.textContent = paciente.nome;
    prontuarioPacienteSelect.appendChild(optionProntuario);
  });
}

async function atualizarListaMedicos() {
  const medicos = await fetchMedicos();
  const consultaMedicoSelect = document.getElementById("consultaMedico") as HTMLSelectElement | null;
  
  if (!consultaMedicoSelect) return;

  consultaMedicoSelect.innerHTML = `<option value="">Selecione o Médico</option>`;

  medicos.forEach((medico: { id: string; nome: string }) => {
    const option = document.createElement("option");
    option.value = medico.id;
    option.textContent = medico.nome;
    consultaMedicoSelect.appendChild(option);
  });
}

async function atualizarListaProntuarios() {
  const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente") as HTMLSelectElement | null;
  if (!prontuarioPacienteSelect) return;

  prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;

  const pacientes = await fetchPacientes();
  pacientes.forEach((paciente: { id: string; nome: string }) => {
    const option = document.createElement("option");
    option.value = paciente.id;
    option.textContent = paciente.nome;
    prontuarioPacienteSelect.appendChild(option);
  });
}

async function exibirPacientes() {
  const pacientes = await fetchPacientes();
  const pacienteList = document.getElementById("pacienteList");
  if (!pacienteList) return;
  
  pacienteList.innerHTML = pacientes
    .map((p: { nome: string; idade: number; telefone: string }) => `<p>${p.nome} - ${p.idade} anos - ${p.telefone}</p>`)
    .join("");
}

async function exibirConsultas() {
  const consultas = await fetchConsultas();
  const consultasAgendadasList = document.getElementById("consultasAgendadasList");
  if (!consultasAgendadasList) return;

  consultasAgendadasList.innerHTML = consultas
    .map((c: { paciente: { nome: string }; medico: { nome: string }; data: string; horario: string; sala: { numero: string } }, index: number) => 
      `<tr><td>${index + 1}</td><td>${c.paciente.nome}</td><td>${c.medico.nome}</td><td>${c.data}</td><td>${c.horario}</td><td>${c.sala.numero}</td></tr>`)
    .join("");
}

async function exibirSalas() {
  const salas = await fetchSalas();
  const salasList = document.getElementById("salasList");
  if (!salasList) return;

  salasList.innerHTML = salas
    .map((s: { numero: number; data: string; horario: string; status: string }, index: number) => 
      `<tr><td>${index + 1}</td><td>${s.numero}</td><td>${s.data}</td><td>${s.horario}</td><td>${s.status}</td></tr>`)
    .join("");
}

async function exibirProntuarios() {
  const prontuarios = await fetchProntuarios();
  const pacientesProntuariosList = document.getElementById("pacientesProntuariosList");
  if (!pacientesProntuariosList) return;

  pacientesProntuariosList.innerHTML = prontuarios
    .map((p: { paciente: { nome: string }; historico: string }) => 
      `<tr><td>${p.paciente.nome}</td><td>${p.historico.replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
}

document.getElementById("pacienteForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nome = (document.getElementById("pacienteNome") as HTMLInputElement)?.value;
  const idade = parseInt((document.getElementById("pacienteIdade") as HTMLInputElement)?.value);
  const telefone = (document.getElementById("pacienteTelefone") as HTMLInputElement)?.value;

  await fetch("http://localhost:3000/api/paciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, idade, telefone })
  });

  (document.getElementById("pacienteNome") as HTMLInputElement).value = "";
  (document.getElementById("pacienteIdade") as HTMLInputElement).value = "";
  (document.getElementById("pacienteTelefone") as HTMLInputElement).value = "";

  atualizarListaPacientes();
  exibirPacientes();
});

atualizarListaPacientes();
atualizarListaMedicos();
atualizarListaProntuarios();
exibirPacientes();
exibirConsultas();
exibirSalas();
exibirProntuarios();