import { useState } from "react";
import styles from "./Configuracoes.module.css";

import HorariosConfig from "./HorariosList";
import ServicosConfig from "./ServicoList";

function Configuracoes() {
  const [aba, setAba] = useState("horarios");

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Configurações</h1>
      <p className={styles.subtitulo}>Configure seu sistema.</p>

      {/* Abas */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            aba === "horarios" ? styles.ativa : ""
          }`}
          onClick={() => setAba("horarios")}
        >
          ⏱ Horários
        </button>

        <button
          className={`${styles.tab} ${
            aba === "servicos" ? styles.ativa : ""
          }`}
          onClick={() => setAba("servicos")}
        >
          💲 Serviços
        </button>
      </div>

      {/* Conteúdo */}
      <div className={styles.conteudo}>
        {aba === "horarios" && <HorariosConfig />}
        {aba === "servicos" && <ServicosConfig />}
      </div>
    </div>
  );
}

export default Configuracoes;