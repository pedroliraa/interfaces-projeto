import { useEffect, useState } from "react";
import styles from "./ServicoList.module.css";
import {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico,
} from "../../services/servicoService";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    duracao: "",
    preco: "",
  });

  useEffect(() => {
    carregarServicos();
  }, []);

 async function carregarServicos() {
  try {
    const dados = await listarServicos();
    //console.log(dados); 
    setServicos(dados);
  } catch (err) {
    console.error("Erro ao carregar serviços:", err);
  }
}

  function abrirNovo() {
    setEditando(null);
    setForm({ nome: "", descricao: "", duracao: "", preco: "" });
    setModalAberto(true);
  }

  function abrirEditar(servico) {
    setEditando(servico._id);
    setForm({
      nome: servico.nome,
      descricao: servico.descricao,
      duracaoMinutos: servico.duracao,
      preco: servico.preco,
    });
    setModalAberto(true);
  }

  async function handleSalvar() {
    try {
      if (!form.nome || !form.duracao || !form.preco) {
        alert("Preencha os campos obrigatórios");
        return;
      }

      if (editando) {
        await atualizarServico(editando, form);
      } else {
        await criarServico(form);
      }

      setModalAberto(false);
      await carregarServicos();
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Deseja deletar este serviço?")) {
      await deletarServico(id);
      carregarServicos();
    }
  }

  const servicosFiltrados = servicos.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Serviços e Preços</h2>
      <p className={styles.subtitulo}>
        Gerencie os serviços oferecidos e seus preços.
      </p>

      <div className={styles.topo}>
        <input
          type="text"
          placeholder="Buscar serviço..."
          className={styles.busca}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <button className={styles.addBtn} onClick={abrirNovo}>
          + Novo Serviço
        </button>
      </div>

      <div className={styles.lista}>
        {servicosFiltrados.map((s) => (
          <div key={s._id} className={styles.item}>
            <div>
              <strong>{s.nome}</strong>
              <p>{s.descricao}</p>
             <span>
  {s.duracaoMinutos ? `${s.duracaoMinutos} min` : "Sem duração"}
</span>
            </div>

            <div className={styles.right}>
              <span className={styles.preco}>R$ {s.preco}</span>

              <button
                className={styles.editar}
                onClick={() => abrirEditar(s)}
              >
                Editar
              </button>

              <button
                className={styles.deletar}
                onClick={() => handleDeletar(s._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editando ? "Editar Serviço" : "Novo Serviço"}</h2>

            <input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) =>
                setForm({ ...form, nome: e.target.value })
              }
            />

            <textarea
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) =>
                setForm({ ...form, descricao: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Duração (min)"
              value={form.duracao}
              onChange={(e) =>
                setForm({ ...form, duracao: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Preço"
              value={form.preco}
              onChange={(e) =>
                setForm({ ...form, preco: e.target.value })
              }
            />

            <div className={styles.modalAcoes}>
              <button onClick={() => setModalAberto(false)}>
                Cancelar
              </button>
              <button onClick={handleSalvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Servicos;