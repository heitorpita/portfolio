import express from "express";
import { ProjetosController } from "../controllers/projetos.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rotas públicas - qualquer pessoa pode acessar
router.get("/", ProjetosController.listar);
router.get("/:id", ProjetosController.buscarPorId);

// Rotas protegidas - somente admin
router.post("/", autenticarToken, autorization.admin, ProjetosController.criar);
router.put("/:id", autenticarToken, autorization.admin, ProjetosController.atualizar);
router.delete("/:id", autenticarToken, autorization.admin, ProjetosController.excluir);

export default router;
