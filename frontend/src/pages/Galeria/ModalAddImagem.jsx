import React, { useState, useEffect } from "react";
import galeriaService from "../../services/galeriaService";
import { X, Upload } from "lucide-react";
import "./Modal.css";

const ModalAddImagem = ({ onClose, onSuccess, fotoExistente }) => {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fotoExistente) {
      setTitulo(fotoExistente.titulo);
      setDescricao(fotoExistente.descricao || "");
      if (fotoExistente.imagemUrl) {
        setPreview(`http://localhost:3000/uploads/${fotoExistente.imagemUrl}`);
      }
    }
  }, [fotoExistente]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) return alert("Por favor, preencha o título!");

    setLoading(true);

    try {
      if (fotoExistente) {
        const dadosParaAtualizar = {
          titulo: titulo,
          descricao: descricao,
        };

        await galeriaService.atualizar(fotoExistente._id, dadosParaAtualizar);
        alert("Imagem atualizada com sucesso!");
      } else {
        if (!file) {
          setLoading(false);
          return alert("Selecione uma imagem!");
        }

        const formData = new FormData();
        formData.append("imagem", file);
        formData.append("titulo", titulo);
        formData.append("descricao", descricao);

        await galeriaService.criar(formData);
        alert("Nova imagem adicionada!");
      }

      onSuccess(); 
    } catch (error) {
      console.error("Erro na operação:", error);
      alert("Erro ao salvar. Verifique se o backend está conectado ao banco.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{fotoExistente ? "Editar Imagem" : "Nova Imagem"}</h2>
          <button onClick={onClose} className="btn-close">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              className="input-field"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Unhas Decoradas"
              required
            />
          </div>

          <div className="upload-area">
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="img-preview" />
                <label htmlFor="file-upload" className="change-image-label">
                  Clique para trocar a imagem
                </label>
              </div>
            ) : (
              <label htmlFor="file-upload" className="upload-label">
                <Upload size={40} />
                <span>Selecionar Foto</span>
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
            <label>Categoria (Filtro)</label>
            <select
              className="input-field"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            >
              <option value="Nail Art">Nail Art</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Alongamento">Alongamento</option>
            </select>
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading
              ? "Processando..."
              : fotoExistente
                ? "Salvar Alterações"
                : "Salvar na Galeria"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddImagem;
