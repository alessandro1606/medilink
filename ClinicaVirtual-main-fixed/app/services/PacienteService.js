import Paciente from '../entities/Paciente.js';

let pacientes = [];

export const PacienteService = {
  listar() {
    return [...pacientes];
  },

  criar(nome, rg, email) {
    const paciente = new Paciente(nome, rg, email);
    paciente.validar();
    pacientes.push(paciente);
    return paciente;
  },

  deletar(rg) {
    pacientes = pacientes.filter(p => p.rg !== rg);
  }
};
