import { DataTypes } from "sequelize";
import sequelize from "../../../config/db.cjs";

const ExperienciaModel = sequelize.define("Experiencia", {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: { msg: "O título não pode estar vazio" },
            len: { args: [1, 150], msg: "O título deve ter entre 1 e 150 caracteres" }
        }
    },
    empresa: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: { msg: "A empresa não pode estar vazia" },
            len: { args: [1, 150], msg: "A empresa deve ter entre 1 e 150 caracteres" }
        }
    },
    periodo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: { args: [0, 50], msg: "O período deve ter no máximo 50 caracteres" }
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: { args: [0, 1000], msg: "A descrição deve ter no máximo 1000 caracteres" }
        }
    },
    ordem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: "experiencias",
    timestamps: true,
});

export default ExperienciaModel;
