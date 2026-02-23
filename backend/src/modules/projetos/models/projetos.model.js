import { DataTypes } from "sequelize";
import sequelize from "../../../config/db.cjs";

const ProjetoModel = sequelize.define("Projeto", {

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
                msg: "O nome não pode estar vazio"
            },
            len: {
                args: [1, 150],
                msg: "O nome deve ter entre 1 e 150 caracteres"
            }
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 1000],
                msg: "A descrição deve ter no máximo 1000 caracteres"
            }
        }
    },
    foto: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            len: {
                args: [0, 500],
                msg: "A URL da foto deve ter no máximo 500 caracteres"
            }
        }
    }
}, {
    tableName: "projetos",
    timestamps: true,
});

export default ProjetoModel;
