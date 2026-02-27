import UsuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UsuarioController {

    static async listar(req, res) {
        try {
            const usuario = await UsuarioModel.findAll(
                {
                    attributes: {
                        exclude: ["senha"]
                    }
                }
            )
            if (!usuario) {
                return res.status(406).json({ msg: "Nenhum usuario encontrado" })
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async perfil(req, res) {
        try {
            return res.json({
                mensagem: "Acesso autorizado!",
                usuario: req.usuario
            });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }


    static async criar(req, res) {
        try {
            const { nome, email, senha, perfil } = req.body;
            if (!nome || !email || !senha || !perfil) {
                return res.status(406).json({ msg: 'Preencha todos os campos!' })
            }
            const senhaHash = await bcrypt.hash(senha, 10);
            await UsuarioModel.create(
                {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    perfil: perfil
                }
            )
            res.status(201).json({ msg: 'Usuario criado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await UsuarioModel.destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json({ msg: "Usuário deletado com sucesso." })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ erro: "email e senha são obrigatórios" });
            }
            const usuario = await UsuarioModel.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )
            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "E-mail ou senha incorreta" });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    perfil: usuario.perfil
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            return res.json({ mensagem: "Login bem-sucedido!", token });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async criarAdmin(req, res) {
        try {
            const senhaHash = await bcrypt.hash(process.env.SENHA_SUPER_ADMIN, 10)
            await UsuarioModel.create(
                {
                    nome: process.env.NOME_SUPER_ADMIN,
                    email: process.env.EMAIL_SUPER_ADMIN,
                    senha: senhaHash,
                    perfil: "admin",
                }
            )
            res.status(201).json({ msg: 'Usuário SUPER ADMIN criado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar admin, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, perfil } = req.body;

            const usuario = await UsuarioModel.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }

            if (email && email !== usuario.email) {
                const emailExiste = await UsuarioModel.findOne({ where: { email } });
                if (emailExiste) {
                    return res.status(409).json({ msg: "Email já está em uso" });
                }
            }

            const dadosAtualizacao = {};
            if (nome) dadosAtualizacao.nome = nome;
            if (email) dadosAtualizacao.email = email;
            if (perfil) dadosAtualizacao.perfil = perfil;
            if (senha) dadosAtualizacao.senha = await bcrypt.hash(senha, 10);

            await usuario.update(dadosAtualizacao);

            const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
            return res.status(200).json(usuarioSemSenha);
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao atualizar usuário", erro: error.message });
        }
    }

}

export default UsuarioController;
