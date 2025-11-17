export default class Paciente {
  constructor(nome, rg, email) {
    this.nome = nome?.trim() || '';
    this.rg = rg ? parseInt(rg, 10) : null;
    this.email = email?.trim() || '';
  }

  validar() {
    if (!this.nome) throw new Error('Nome do paciente é obrigatório.');
    if (!this.rg || isNaN(this.rg)) throw new Error('RG inválido.');
    if (!/\S+@\S+\.\S+/.test(this.email)) throw new Error('Email inválido.');
  }
}
