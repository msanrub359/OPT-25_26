
// models/Alumno.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../data/db.js';

export const Alumno = sequelize.define('Alumno', {
    idAlumno: {
        type: DataTypes.SMALLINT.UNSIGNED,  //entero pequeño sin negativos
        primaryKey: true, //Clave primaria
        autoIncrement: true, //se incrementa solo
        field: 'idAlumno' // Nombre exacto de la columna en la BD
    },
    apellidosNombre: {
        type: DataTypes.STRING(50),
        allowNull: false, //No permite null
        field: 'apellidosNombre',
        validate: { //validaciones automáticas
            notEmpty: { //no permite string vacío
                msg: 'El nombre y apellidos no pueden estar vacíos'
            },
            len: {
                args: [5, 50], //longitud máxima y mínima
                msg: 'Debe tener entre 5 y 50 caracteres'
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
        },
        references: {  //relación
            model: 'cursos',
            key: 'idCurso' //clave foránea
        }
    }
}, {
    tableName: 'alumnos',      // Nombre exacto de la tabla
    timestamps: false,          // La tabla NO tiene createdAt/updatedAt
    charset: 'latin1',          // Charset de tu tabla
    collate: 'latin1_swedish_ci' // Collation de tu tabla
});

/**TIPOS DE DATOS */
// DataTypes.STRING
// DataTypes.INTEGER
// DataTypes.SMALLINT
// DataTypes.BIGINT
// DataTypes.FLOAT
// DataTypes.DOUBLE
// DataTypes.DECIMAL
// DataTypes.BOOLEAN
// DataTypes.DATE
// DataTypes.DATEONLY
// DataTypes.TIME
// DataTypes.JSON
// DataTypes.TEXT
// DataTypes.UUID
// DataTypes.ENUM('A','B')
// DataTypes.BLOB

/**OPCIONES DE COLUMNA */
// primaryKey: true
// autoIncrement: true
// allowNull: false
// unique: true
// defaultValue: 0
// field: 'nombre_real'
// comment: 'Descripción'

/**VALIDACIONES */
// validate: {
//   notNull: true,
//   notEmpty: true,
//   isEmail: true,
//   isInt: true,
//   isFloat: true,
//   min: 0,
//   max: 100,
//   len: [3,20],
//   isIn: [['A','B','C']],
//   contains: 'abc',
//   isDate: true,
//   isUrl: true,
// }
// Se pueden crear validaciones propias
// isCorrect(value) {
//   if(value !== 'ok') throw new Error('No válido');
// }

/**RELACIONES */
// references: { model, key }
// onUpdate: 'CASCADE'
// onDelete: 'SET NULL'