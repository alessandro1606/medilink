
import PacienteService from "../services/PacienteService";
import MedicoService from "../services/MedicoService";
import ConsultaService from "../services/ConsultaService";
import UsuarioService from "../services/UsuarioService";


let examesStore = [];
let exameIdCounter = 1;


if (examesStore.length === 0) {
  examesStore.push({
    id: exameIdCounter++,
    descricao: "Hemograma Completo",
    dataexame: "2025-01-10",
    preco: 120.0,
    paciente: { nome: "Maria Silva", rg: 1234567, email: "maria@example.com" },
  });
}


function parsePath(path) {
  const p = String(path || "").split("?")[0];
  const parts = p.split("/").filter(Boolean);
  return parts; // ex: ['exames', '1']
}

function wrap(data) {
  return Promise.resolve({ data });
}

const api = {
  get: async (path) => {
    const parts = parsePath(path);
    const resource = parts[0];

    // exames
    if (resource === "exames") {
      if (parts[1]) {
        const id = Number(parts[1]);
        return wrap(examesStore.find((e) => e.id === id) || null);
      }
      return wrap(examesStore.slice()); // retorna uma cópia do array
    }

    // pacientes
    if (resource === "pacientes") {
      if (parts[1]) {
        const id = Number(parts[1]);
        return wrap(PacienteService.buscarPorId(id));
      }
      return wrap(PacienteService.listar());
    }

    // medicos
    if (resource === "medicos") {
      if (parts[1]) {
        const id = Number(parts[1]);
        return wrap(MedicoService.buscarPorId(id));
      }
      return wrap(MedicoService.listar());
    }

    // consultas
    if (resource === "consultas") {
      if (parts[1]) {
        const id = Number(parts[1]);
        return wrap(ConsultaService.buscarPorId(id));
      }
      return wrap(ConsultaService.listar());
    }

    // usuarios
    if (resource === "usuarios") {
      if (parts[1]) {
        const id = Number(parts[1]);
        return wrap(UsuarioService.buscarPorId(id));
      }
      return wrap(UsuarioService.listar());
    }

    return wrap(null);
  },

  post: async (path, data) => {
    const parts = parsePath(path);
    const resource = parts[0];

    if (resource === "exames") {
      const novo = {
        id: exameIdCounter++,
        descricao: data.descricao,
        dataexame: data.dataexame,
        preco: Number(data.preco),
        paciente: data.paciente || null,
      };
      examesStore.push(novo);
      return wrap(novo);
    }

    if (resource === "pacientes") {
      const p = PacienteService.criar(data.nome, data.dataNascimento, data.telefone, data.email);
      return wrap(p);
    }

    if (resource === "medicos") {
      const m = MedicoService.criar(data.nome, data.especialidade, data.crm, data.telefone);
      return wrap(m);
    }

    if (resource === "consultas") {
      const c = ConsultaService.criar(data.pacienteId, data.medicoId, data.data, data.horario, data.descricao);
      return wrap(c);
    }

    if (resource === "usuarios") {
      const u = UsuarioService.criar(data.nome, data.email, data.senha, data.tipo);
      return wrap(u);
    }

    return wrap(null);
  },

  put: async (path, data) => {
    const parts = parsePath(path);
    const resource = parts[0];

    if (resource === "exames" && parts[1]) {
      const id = Number(parts[1]);
      const idx = examesStore.findIndex((e) => e.id === id);
      if (idx >= 0) {
        examesStore[idx] = { ...examesStore[idx], ...data };
        return wrap(examesStore[idx]);
      }
      return wrap(null);
    }

    if (resource === "pacientes" && parts[1]) {
      const id = Number(parts[1]);
      const updated = PacienteService.atualizar(id, data);
      return wrap(updated);
    }

    // outros resources podem ser implementados se necessário
    return wrap(null);
  },

  delete: async (path) => {
    const parts = parsePath(path);
    const resource = parts[0];

    if (resource === "exames" && parts[1]) {
      const id = Number(parts[1]);
      const before = examesStore.length;
      examesStore = examesStore.filter((e) => e.id !== id);
      const after = examesStore.length;
      return wrap({ success: before !== after });
    }

    if (resource === "pacientes" && parts[1]) {
      const id = Number(parts[1]);
      PacienteService.deletar(id);
      return wrap({ success: true });
    }

    if (resource === "medicos" && parts[1]) {
      const id = Number(parts[1]);
      MedicoService.deletar(id);
      return wrap({ success: true });
    }

    if (resource === "consultas" && parts[1]) {
      const id = Number(parts[1]);
      ConsultaService.deletar(id);
      return wrap({ success: true });
    }

    return wrap({ success: false });
  },
};

// Compatibilidade com código legado (insert/select/update/remove)
if (!api.insert) api.insert = api.post;
if (!api.select) api.select = api.get;
if (!api.update) api.update = api.put;
if (!api.remove) api.remove = api.delete;

// --- Exports legados e helpers (nomes que seu código usa)
export async function findAll() {
  const res = await api.get("exames");
  return res.data || [];
}

export async function deleteById(id) {
  const res = await api.delete(`exames/${id}`);
  return res.data;
}

export async function insert(descricao, dataexame, preco, paciente) {
  const res = await api.post("exames", {
    descricao,
    dataexame,
    preco,
    paciente,
  });
  return res.data;
}

export async function update(id, descricao, dataexame, preco, paciente) {
  const res = await api.put(`exames/${id}`, {
    descricao,
    dataexame,
    preco,
    paciente,
  });
  return res.data;
}

// Também exporta versões em português (se alguma tela importar esses nomes)
export async function listar(resource = "exames") {
  const res = await api.get(resource);
  return res.data;
}
export async function criar(resource, payload) {
  const res = await api.post(resource, payload);
  return res.data;
}
export async function atualizar(resource, idOrPayload, payloadIfAny) {
  // supports atualizar('pacientes', id, data) or atualizar('pacientes', dataObj) for exames use atualizar('exames', id, data)
  if (typeof idOrPayload === "number") {
    const id = idOrPayload;
    return (await api.put(`${resource}/${id}`, payloadIfAny)).data;
  } else {
    // payload only
    return (await api.put(`${resource}`, idOrPayload)).data;
  }
}
export async function deletar(resourceOrId, maybeId) {
  // deletar('pacientes', id) or deletar(id) for exames
  if (typeof maybeId === "undefined" && typeof resourceOrId === "number") {
    // deletar(id) => assume exames
    return (await api.delete(`exames/${resourceOrId}`)).data;
  }
  return (await api.delete(`${resourceOrId}/${maybeId}`)).data;
}

// default export (compatibilidade com imports default)
export default api;
