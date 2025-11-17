import Consulta from "../entities/Consulta";

class ConsultaService {
  constructor() {
    this.consultas = [];
  }

  listar() {
    return this.consultas;
  }

  buscarPorId(id) {
    return this.consultas.find(c => c.id === id);
  }

  criar(pacienteId, medicoId, data, horario, descricao) {
    const id = this.consultas.length + 1;
    const consulta = new Consulta(id, pacienteId, medicoId, data, horario, descricao);
    this.consultas.push(consulta);
    return consulta;
  }

  deletar(id) {
    this.consultas = this.consultas.filter(c => c.id !== id);
  }
}

export default new ConsultaService();
