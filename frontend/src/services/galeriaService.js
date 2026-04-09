import api from './api';

const galeriaService = {
  listar: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get('/galeria', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar galeria:", error);
      throw error;
    }
  },

  criar: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post('/galeria', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item na galeria:", error);
      throw error;
    }
  },

  atualizar: async (id, dados) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(`/galeria/${id}`, dados, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar galeria:", error);
      throw error;
    }
  },

  excluir: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/galeria/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      throw error;
    }
  }
}; 

export default galeriaService;