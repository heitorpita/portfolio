import express from "express";
import { ExperienciasController } from "../controllers/experiencias.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rotas públicas
router.get("/", ExperienciasController.listar);

// Rotas protegidas - somente admin
router.post("/", autenticarToken, autorization.admin, ExperienciasController.criar);
router.put("/:id", autenticarToken, autorization.admin, ExperienciasController.atualizar);
router.delete("/:id", autenticarToken, autorization.admin, ExperienciasController.excluir);

export default router;
