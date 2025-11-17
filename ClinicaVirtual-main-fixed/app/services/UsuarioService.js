let usuarios = [{ id: 1, nome: 'Admin', email: 'admin@admin.com', senha: '1234' }];

export const UsuarioService = {
  login(email, senha) {
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (!user) throw new Error('Usuário ou senha inválidos');
    return user;
  },

  cadastrar(nome, email, senha) {
    if (!nome || !email || !senha) throw new Error('Preencha todos os campos');
    const id = Date.now();
    const novo = { id, nome, email, senha };
    usuarios.push(novo);
    return novo;
  }
};
