import React, { useState } from "react";
import galeriaService from "../../services/galeriaService";
import { X, Upload } from "lucide-react";
import "./Modal.css";

const ModalAddImagem = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Nail Art");
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
    
    if (!file) return alert("Por favor, selecione uma imagem!");
    if (!titulo.trim()) return alert("Por favor, digite um título!");

    setLoading(true);

    const formData = new FormData();
    formData.append("imagem", file); 
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);

    try {
      await galeriaService.criar(formData);
      alert("Imagem enviada com sucesso!");
      onSuccess(); 
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nova Nail Art</h2>
          <button onClick={onClose} className="btn-close"><X /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título da Foto</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="Ex: Francesinha delicada"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="upload-area">
            {preview ? (
              <img src={preview} alt="Preview" className="img-preview" />
            ) : (
              <label htmlFor="file-upload" className="upload-label">
                <Upload size={40} />
                <span>Selecionar Foto</span>
              </label>
            )}
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} hidden />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select 
              className="input-field"
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Nail Art">Nail Art</option>
              <option value="Alongamento">Alongamento</option>
              <option value="Manicure">Manicure</option>
            </select>
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Enviando..." : "Salvar na Galeria"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddImagem;