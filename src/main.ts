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

      pacientes.forEach((paciente: { id: string; nome: string }) => {
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

      medicos.forEach((medico: { id: string; nome: string }) => {
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

      salas.forEach((sala: { id: string; consultorio: string }) => {
          const option = new Option(sala.consultorio, sala.id);
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

      const paciente_Id = (document.getElementById("consultaPaciente") as HTMLSelectElement).value;
      const medico_Id = (document.getElementById("consultaMedico") as HTMLSelectElement).value;
      const sala_Id = (document.getElementById("consultaSala") as HTMLSelectElement).value;
      const data = (document.getElementById("consultaData") as HTMLInputElement).value;
      const horario = (document.getElementById("consultaHorario") as HTMLInputElement).value;

      try {
          const response = await fetch("http://localhost:3000/api/consultas", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paciente_Id, medico_Id, sala_Id, data, horario }),
          });

          if (!response.ok) throw new Error("Erro ao cadastrar consulta");

          consultaForm.reset();
          console.log("Consulta agendada com sucesso!");

      } catch (error) {
          console.error("Erro ao agendar consulta:", error);
      }
  });

  const prontuarioForm = document.getElementById("prontuarioForm") as HTMLFormElement;

  prontuarioForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const paciente_Id = (document.getElementById("prontuarioPaciente") as HTMLSelectElement).value;
      const historico = (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value;

      try {
          const response = await fetch("http://localhost:3000/api/prontuarios", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paciente_Id, historico }),
          });

          if (!response.ok) throw new Error("Erro ao cadastrar prontuário");

          prontuarioForm.reset();
          console.log("Prontuário registrado com sucesso!");

      } catch (error) {
          console.error("Erro ao cadastrar prontuário:", error);
      }
  });
}
