import ExperienciaModel from "../models/experiencias.model.js";

export class ExperienciasController {

    static async listar(req, res) {
        try {
            const experiencias = await ExperienciaModel.findAll({
                order: [["ordem", "ASC"]]
            });
            res.status(200).json(experiencias);
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }

    static async criar(req, res) {
        try {
            const { titulo, empresa, periodo, descricao, ordem } = req.body;
            if (!titulo || !empresa) {
                return res.status(400).json({ msg: "Título e empresa são obrigatórios" });
            }
            const experiencia = await ExperienciaModel.create({ titulo, empresa, periodo, descricao, ordem: ordem ?? 0 });
            res.status(201).json({ msg: "Experiência criada com sucesso!", experiencia });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, empresa, periodo, descricao, ordem } = req.body;

            const experiencia = await ExperienciaModel.findByPk(id);
            if (!experiencia) {
                return res.status(404).json({ msg: "Experiência não encontrada" });
            }

            const dados = {};
            if (titulo !== undefined) dados.titulo = titulo;
            if (empresa !== undefined) dados.empresa = empresa;
            if (periodo !== undefined) dados.periodo = periodo;
            if (descricao !== undefined) dados.descricao = descricao;
            if (ordem !== undefined) dados.ordem = ordem;

            await experiencia.update(dados);
            return res.status(200).json({ msg: "Experiência atualizada com sucesso!", experiencia });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao atualizar experiência", erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const experiencia = await ExperienciaModel.findByPk(id);
            if (!experiencia) {
                return res.status(404).json({ msg: "Experiência não encontrada" });
            }
            await ExperienciaModel.destroy({ where: { id } });
            res.status(200).json({ msg: "Experiência excluída com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }
}

export default ExperienciasController;
