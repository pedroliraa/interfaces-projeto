import api from "./api";

const galeriaService = {

  async listar() {
    const response = await api.get("/galeria");
    return response.data;
  },

  async cadastrar(formData, token) {
    const response = await api.post("/galeria", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deletar(id, token) {
    const response = await api.delete(`/galeria/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async atualizar(id, dados, token) {
    const response = await api.put(`/galeria/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};

export default galeriaService;