import { useEffect, useState } from "react";
import styles from "./HorariosList.module.css";

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

function HorariosConfig() {
  const [dias, setDias] = useState({});
  const [inicio, setInicio] = useState("08:00");
  const [fim, setFim] = useState("18:00");

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("horarios"));

    if (dadosSalvos) {
      setDias(dadosSalvos.dias);
      setInicio(dadosSalvos.inicio);
      setFim(dadosSalvos.fim);
    } else {
      // inicializa tudo desligado
      const inicial = {};
      diasSemana.forEach(d => (inicial[d] = false));
      setDias(inicial);
    }
  }, []);

  function toggleDia(dia) {
    setDias({ ...dias, [dia]: !dias[dia] });
  }

  function salvar() {
    const payload = { dias, inicio, fim };
    localStorage.setItem("horarios", JSON.stringify(payload));
    alert("Horários salvos!");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Configurações</h1>
      <p className={styles.subtitulo}>
        Configure seu sistema.
      </p>

      <div className={styles.card}>
        <h2 className={styles.cardTitulo}>Funcionamento</h2>

        <div className={styles.grid}>
          {diasSemana.map((dia) => (
            <div key={dia} className={styles.dia}>
              <span>{dia}</span>

              <div
                className={`${styles.toggle} ${
                  dias[dia] ? styles.ativo : ""
                }`}
                onClick={() => toggleDia(dia)}
              >
                <div className={styles.bolinha}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.horarios}>
          <div>
            <label>Horário de Início</label>
            <input
              type="time"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
            />
          </div>

          <div>
            <label>Horário de Término</label>
            <input
              type="time"
              value={fim}
              onChange={(e) => setFim(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.btnSalvar} onClick={salvar}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default HorariosConfig;