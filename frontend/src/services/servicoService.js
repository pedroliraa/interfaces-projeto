import api from "./api";

export const listarServicos = async () => {
  const res = await api.get("/servicos");
  return res.data;
};

export const criarServico = async (data) => {
  const res = await api.post("/servicos", data);
  return res.data;
};

export const atualizarServico = async (id, data) => {
  const res = await api.put(`/servicos/${id}`, data);
  return res.data;
};

export const deletarServico = async (id) => {
  const res = await api.delete(`/servicos/${id}`);
  return res.data;
};