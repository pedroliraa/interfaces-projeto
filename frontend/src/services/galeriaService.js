import api from './api';

const galeriaService = {
  listar: async () => {
    try {
      const response = await api.get('/galeria');
      return response.data;
    } catch (error) {
      console.error("Erro ao listar galeria:", error);
      throw error;
    }
  },

  criar: async (formData) => {
    try {
      const response = await api.post('/galeria', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item na galeria:", error);
      alert("Erro ao enviar imagem. Verifique se o backend está rodando.");
      throw error;
    }
  },

  atualizar: async (id, dados) => {
    try {
      const response = await api.put(`/galeria/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar galeria:", error);
      throw error;
    }
  },

  // 4. EXCLUIR: Remove a foto
  excluir: async (id) => {
    try {
      const response = await api.delete(`/galeria/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir item da galeria:", error);
      throw error;
    }
  },
};

export default galeriaService;