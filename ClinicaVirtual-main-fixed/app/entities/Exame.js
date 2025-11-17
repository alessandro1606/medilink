import Paciente from './Paciente.js';

export default class Exame {
  constructor(id, descricao, dataexame, preco, paciente) {
    this.id = id || Date.now();
    this.descricao = descricao?.trim() || '';
    this.dataexame = dataexame;
    this.preco = parseFloat(preco) || 0;
    this.paciente = paciente instanceof Paciente ? paciente : new Paciente();
  }

  validar() {
    if (!this.descricao) throw new Error('Descrição é obrigatória.');
    if (!this.dataexame) throw new Error('Data do exame é obrigatória.');
    if (isNaN(this.preco) || this.preco <= 0)
      throw new Error('Preço deve ser um número válido.');
    this.paciente.validar();
  }
}
