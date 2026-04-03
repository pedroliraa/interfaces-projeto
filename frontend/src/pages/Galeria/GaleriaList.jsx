import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react"; // fazer "npm install lucie-react" para usar esses ícones
import galeriaService from "../../services/galeriaService";
import ModalAddImagem from "./ModalAddImagem";
import "./Galeria.css";

const GaleriaList = () => {
  const [fotos, setFotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");
  
  // Pegamos o token que o grupo salvou no login
  const token = localStorage.getItem("token");

  // Carrega as fotos assim que a página abre
  useEffect(() => {
    carregarFotos();
  }, []);

  const carregarFotos = async () => {
    try {
      const dados = await galeriaService.listar();
      setFotos(dados);
    } catch (error) {
      console.error("Erro ao buscar fotos da galeria:", error);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja remover esta imagem?")) {
      try {
        await galeriaService.deletar(id, token);
        // Atualiza a lista local removendo a foto deletada
        setFotos(fotos.filter(foto => foto._id !== id));
      } catch (error) {
        alert("Erro ao excluir. Certifique-se de que está logada.");
      }
    }
  };

  return (
    <div className="galeria-page">
      {/* HEADER DA PÁGINA */}
      <header className="galeria-header">
        <div className="header-text">
          <h1>Galeria</h1>
          <p>Confira as imagens presentes na galeria. Adicione, exclua ou edite.</p>
        </div>
        <button className="btn-add" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Adicionar Imagem
        </button>
      </header>

      {/* BARRA DE FILTROS (Baseada no Figma) */}
      <nav className="galeria-filter">
        {["Todas", "Nail Art", "Manicure", "Pedicure", "Alongamento"].map((cat) => (
          <button 
            key={cat}
            className={filtroAtivo === cat ? "active" : ""}
            onClick={() => setFiltroAtivo(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* GRID DE IMAGENS */}
      <div className="galeria-grid">
        {fotos.length > 0 ? (
          fotos.map((foto) => (
            <div key={foto._id} className="galeria-card">
              <img 
                src={`http://localhost:3000/uploads/${foto.imagemUrl}`} 
                alt={foto.titulo} 
              />
              
              {/* BOTÕES FLUTUANTES (Ações) */}
              <div className="card-actions">
                <button className="btn-edit" title="Editar">
                  <Pencil size={14} />
                </button>
                <button 
                  className="btn-delete" 
                  title="Excluir"
                  onClick={() => handleExcluir(foto._id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">Nenhuma imagem encontrada na galeria.</p>
        )}
      </div>

      {/* MODAL DE ADICIONAR (Controlado pelo estado) */}
      <ModalAddImagem 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSucesso={carregarFotos} 
      />
    </div>
  );
};

export default GaleriaList;