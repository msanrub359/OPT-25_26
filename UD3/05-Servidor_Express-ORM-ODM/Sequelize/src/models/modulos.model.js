// models/Modulo.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../data/db.js';

export const Modulo = sequelize.define('Modulo', {
    idModulo: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false,
        field: 'idModulo',
        validate: {
            notEmpty: {
                msg: 'El ID del módulo no puede estar vacío'
            },
            len: {
                args: [1, 8],
                msg: 'El ID del módulo debe tener entre 1 y 8 caracteres'
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'descripcion',
        validate: {
            notEmpty: {
                msg: 'La descripción no puede estar vacía'
            },
            len: {
                args: [2, 50],
                msg: 'La descripción debe tener entre 2 y 50 caracteres'
            }
        }
    },
    idCurso: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'idCurso',
        validate: {
            notEmpty: {
                msg: 'El ID del curso es obligatorio'
            }
        }
    }
}, {
    tableName: 'modulos',
    timestamps: false,
    charset: 'latin1',
    collate: 'latin1_swedish_ci'
});