import express from "express";
import { criarServico,
listarServicos,
buscarServicoPorId,
atualizarServico,
deletarServico 
 } from "../controllers/servicoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(verificarToken);

router.post("/", criarServico);
router.get("/", listarServicos);
router.get("/:id", buscarServicoPorId);
router.put("/:id", atualizarServico);
router.delete("/:id", deletarServico);

export default router;