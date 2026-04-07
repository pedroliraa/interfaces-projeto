import React, { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import galeriaService from "../../services/galeriaService";
import ModalAddImagem from "./ModalAddImagem";
import "./Galeria.css";

const GaleriaList = () => {
  const [fotos, setFotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");

  const carregarFotos = useCallback(async () => {
    try {
      const dados = await galeriaService.listar();
      setFotos(dados || []);
    } catch (error) {
      console.error("Erro ao buscar fotos da galeria:", error);
    }
  }, []);

  useEffect(() => {
    let ativo = true;

    async function buscarDadosIniciais() {
      try {
        const dados = await galeriaService.listar();
        if (ativo) {
          setFotos(dados || []);
        }
      } catch (error) {
        console.error("Erro na carga inicial:", error);
      }
    }

    buscarDadosIniciais();

    return () => {
      ativo = false; 
    };
  }, []); 

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja remover esta imagem?")) {
      try {
        await galeriaService.excluir(id);
        carregarFotos();
      } catch (error) {
        console.error("Erro ao excluir foto:", error);
      }
    }
  };

  const fotosFiltradas =
    filtroAtivo === "Todas"
      ? fotos
      : fotos.filter((foto) => foto.categoria === filtroAtivo);

  return (
    <div className="galeria-page">
      <header className="galeria-header">
        <div>
          <h1>Galeria</h1>
          <p>
            Confira as imagens presentes na galeria. Adicione, exclua ou edite.
          </p>
        </div>
        <button className="btn-add" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Adicionar Imagem
        </button>
      </header>

      {/* Filtros conforme seu design: Todas, Nail Art, Manicure, Pedicure, Alongamento */}
      <div className="galeria-filter">
        {["Todas", "Nail Art", "Manicure", "Pedicure", "Alongamento"].map(
          (cat) => (
            <button
              key={cat}
              className={filtroAtivo === cat ? "active" : ""}
              onClick={() => setFiltroAtivo(cat)}
            >
              {cat}
            </button>
          ),
        )}
      </div>

      {/* Grid de Fotos */}
      <div className="galeria-grid">
        {fotosFiltradas.length > 0 ? (
          fotosFiltradas.map((foto) => (
            <div key={foto._id} className="galeria-card">
              <img src={foto.url} alt={foto.titulo || "Trabalho"} />
              <div className="card-actions">
                <button className="btn-edit" title="Editar">
                  <Pencil size={16} />
                </button>
                <button
                  className="btn-delete"
                  title="Excluir"
                  onClick={() => handleExcluir(foto._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">Nenhuma foto encontrada nesta categoria.</p>
        )}
      </div>

      {/* Modal de Upload */}
      {isModalOpen && (
        <ModalAddImagem
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            carregarFotos();
          }}
        />
      )}
    </div>
  );
};

export default GaleriaList;
