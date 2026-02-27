import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./src/modules/usuario/routes/usuario.routes.js";
import { UsuarioController } from "./src/modules/usuario/controllers/usuario.controller.js";
import projetoRoutes from "./src/modules/projetos/routes/projetos.routes.js";
import experienciasRoutes from "./src/modules/experiencias/routes/experiencias.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok" }));
app.post("/", UsuarioController.criarAdmin);

app.use("/usuarios", usuarioRoutes);
app.use("/projetos", projetoRoutes);
app.use("/experiencias", experienciasRoutes);

app.listen(process.env.PORT, async() => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});