import React, { useState } from "react";
import galeriaService from "../../services/galeriaService";
import { X, Upload } from "lucide-react";
import "./Modal.css";

const ModalAddImagem = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState(""); 
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !titulo.trim()) {
      return alert("Por favor, preencha o título e selecione uma foto!");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("imagem", file); 
    formData.append("titulo", titulo);
    formData.append("descricao", descricao); 

    try {
      await galeriaService.criar(formData);
      alert("Imagem enviada com sucesso!");
      onSuccess(); // Fecha o modal e recarrega a lista
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar imagem. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nova Imagem</h2>
          <button onClick={onClose} className="btn-close"><X /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título da Obra</label>
            <input 
              type="text" 
              placeholder="Ex: Francesinha Clássica" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="upload-area">
            {preview ? (
              <img src={preview} alt="Preview" className="img-preview" />
            ) : (
              <label htmlFor="file-upload" className="upload-label">
                <Upload size={40} />
                <span>Selecione a Imagem</span>
              </label>
            )}
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*"
              onChange={handleFileChange} 
              hidden 
            />
          </div>

          <div className="form-group">
            <label>Categoria para Filtro</label>
            <select 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)}
              className="input-field"
            >
              <option value="Nail Art">Nail Art</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Alongamento">Alongamento</option>
            </select>
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Salvando..." : "Salvar na Galeria"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddImagem;