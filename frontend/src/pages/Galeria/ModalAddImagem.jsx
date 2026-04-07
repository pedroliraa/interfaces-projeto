import React, { useState } from "react";
import galeriaService from "../../services/galeriaService";

const ModalAddImagem = ({ isOpen, onClose, onSucesso }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!arquivo) return alert("Selecione uma imagem!");

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("imagem", arquivo);

    try {
      setLoading(true);
      await galeriaService.cadastrar(formData, token);
      onSucesso(); 
      onClose();   
      setTitulo(""); setDescricao(""); setArquivo(null); 
    } catch (error) {
      alert("Erro ao cadastrar imagem. Verifique o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Nova Imagem</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Título</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <textarea 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Imagem</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setArquivo(e.target.files[0])} 
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Enviando..." : "Salvar Imagem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddImagem;