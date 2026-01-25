// models/Curso.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../data/db.js';

export const Curso = sequelize.define('Curso', {
    idCurso: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        field: 'idCurso',
        validate: {
            notEmpty: {
                msg: 'El ID del curso no puede estar vacío'
            },
            len: {
                args: [3, 10],
                msg: 'El ID del curso debe tener entre 3 y 10 caracteres'
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
                args: [5, 50],
                msg: 'La descripción debe tener entre 5 y 50 caracteres'
            }
        }
    }
}, {
    tableName: 'cursos',
    timestamps: false,
    charset: 'latin1',
    collate: 'latin1_swedish_ci'
});