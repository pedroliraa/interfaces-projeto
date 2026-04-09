import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import agendamentoRoutes from "./routes/agendamentoRoutes.js";
import servicosRoutes from "./routes/servicosRoutes.js";
import galeriaRoutes from "./routes/galeriaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";
import perfilClienteRoutes from "./routes/perfilClienteRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Backend Nails Design is running");
});

app.use("/auth", authRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/perfil", perfilClienteRoutes);
app.use("/agendamento", agendamentoRoutes);
app.use("/servicos", servicosRoutes);
app.use("/galeria", galeriaRoutes);

export default app;