import express from "express";
import {
    criarFuncionario,
    listarFuncionarios,
    buscarFuncionario,
    atualizarFuncionario,
    deletarFuncionario
} from "../controllers/funcionarioController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarAdmin } from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/", verificarToken, verificarAdmin, criarFuncionario);
router.get("/", verificarToken,  listarFuncionarios);
router.get("/:id", verificarToken, buscarFuncionario);
router.put("/:id", verificarToken, verificarAdmin, atualizarFuncionario);
router.delete("/:id", verificarToken, verificarAdmin, deletarFuncionario);
export default router;