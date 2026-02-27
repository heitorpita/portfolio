import ProjetoModel from "../models/projetos.model.js";

export class ProjetosController {

    static async listar(req, res) {
        try {
            const projetos = await ProjetoModel.findAll();
            if (!projetos || projetos.length === 0) {
                return res.status(404).json({ msg: "Nenhum projeto encontrado" });
            }
            res.status(200).json(projetos);
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const projeto = await ProjetoModel.findByPk(id);
            if (!projeto) {
                return res.status(404).json({ msg: "Projeto não encontrado" });
            }
            res.status(200).json(projeto);
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, descricao, foto, link } = req.body;
            if (!nome) {
                return res.status(400).json({ msg: "O nome do projeto é obrigatório" });
            }
            const projeto = await ProjetoModel.create({
                nome,
                descricao,
                foto,
                link
            });
            res.status(201).json({ msg: "Projeto criado com sucesso!", projeto });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, foto, link } = req.body;

            const projeto = await ProjetoModel.findByPk(id);
            if (!projeto) {
                return res.status(404).json({ msg: "Projeto não encontrado" });
            }

            const dadosAtualizacao = {};
            if (nome) dadosAtualizacao.nome = nome;
            if (descricao) dadosAtualizacao.descricao = descricao;
            if (foto) dadosAtualizacao.foto = foto;
            if (link !== undefined) dadosAtualizacao.link = link;

            await projeto.update(dadosAtualizacao);

            return res.status(200).json({ msg: "Projeto atualizado com sucesso!", projeto });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao atualizar projeto", erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const projeto = await ProjetoModel.findByPk(id);
            if (!projeto) {
                return res.status(404).json({ msg: "Projeto não encontrado" });
            }

            await ProjetoModel.destroy({
                where: { id }
            });

            res.status(200).json({ msg: "Projeto excluído com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
        }
    }
}

export default ProjetosController;
