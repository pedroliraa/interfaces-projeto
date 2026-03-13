import express from "express";
import {
  listarClientes,
  buscarClientePorId,
  buscarClientePorNome,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "../controllers/clienteController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/buscar", buscarClientePorNome);

router.use(verificarToken);

router.get("/", listarClientes);
router.get("/:id",  buscarClientePorId);
router.post("/",  criarCliente);
router.put("/:id", atualizarCliente);
router.delete("/:id",  deletarCliente);

export default router;
