import Exame from '../entities/Exame.js';
import Paciente from '../entities/Paciente.js';

let exames = [];

export const ExameService = {
  findAll() {
    return [...exames];
  },

  findById(id) {
    return exames.find((e) => e.id === id);
  },

  insert(descricao, dataexame, preco, pacienteObj) {
    const paciente = new Paciente(pacienteObj.nome, pacienteObj.rg, pacienteObj.email);
    const exame = new Exame(null, descricao, dataexame, preco, paciente);
    exame.validar();
    exames.push(exame);
    return exame;
  },

  update(id, descricao, dataexame, preco, pacienteObj) {
    const index = exames.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Exame não encontrado.');

    const paciente = new Paciente(pacienteObj.nome, pacienteObj.rg, pacienteObj.email);
    const exameAtualizado = new Exame(id, descricao, dataexame, preco, paciente);
    exameAtualizado.validar();
    exames[index] = exameAtualizado;
    return exameAtualizado;
  },

  deleteById(id) {
    exames = exames.filter((e) => e.id !== id);
  },

  findByPacienteNome(nome) {
    return exames.filter((e) =>
      e.paciente.nome.toLowerCase().includes(nome.toLowerCase())
    );
  },

  findByData(data) {
    return exames.filter((e) => e.dataexame === data);
  },

  calcularMediaPreco() {
    if (exames.length === 0) return 0;
    const total = exames.reduce((sum, e) => sum + e.preco, 0);
    return parseFloat((total / exames.length).toFixed(2));
  },

  limparTudo() {
    exames = [];
  },
};
