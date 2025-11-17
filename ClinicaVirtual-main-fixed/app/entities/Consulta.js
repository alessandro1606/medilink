export default class Consulta {
  constructor(id, pacienteId, medicoId, data, horario, descricao) {
    this.id = id;
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
    this.data = data;
    this.horario = horario;
    this.descricao = descricao;
  }
}
