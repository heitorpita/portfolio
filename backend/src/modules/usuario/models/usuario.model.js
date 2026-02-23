import { DataTypes } from "sequelize";
import sequelize from "../../../config/db.cjs";

const UsuarioModel = sequelize.define("Usuario", {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O nome nao pode estar vazio"
            },
            len: {
                args: [1, 150],
                msg: "O nome deve ter entre 1 e 150 caracteres"
            }
        }
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A senha não pode estar vazia"
            },
        },
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O email não pode estar vazio"
            },
            isEmail: {
                msg: "Formato de email inválido"
            },
        },
    },
    perfil: {
        type: DataTypes.ENUM('admin', 'cliente'),
        allowNull: true,
        validate: {
            isIn: {
                args: [['admin', 'user_none']],
                msg: "O perfil deve ser admin"
            },
        },
    },
},
        {
        tableName: "usuario",
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
        deletedAt: "excluido_em",
        paranoid: true,
    }
)

export default UsuarioModel;