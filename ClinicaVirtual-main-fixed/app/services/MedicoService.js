import Medico from "../entities/Medico";

class MedicoService {
  constructor() {
    this.medicos = [];
  }

  listar() {
    return this.medicos;
  }

  buscarPorId(id) {
    return this.medicos.find(m => m.id === id);
  }

  criar(nome, especialidade, crm, telefone) {
    const id = this.medicos.length + 1;
    const medico = new Medico(id, nome, especialidade, crm, telefone);
    this.medicos.push(medico);
    return medico;
  }

  deletar(id) {
    this.medicos = this.medicos.filter(m => m.id !== id);
  }
}

export default new MedicoService();
