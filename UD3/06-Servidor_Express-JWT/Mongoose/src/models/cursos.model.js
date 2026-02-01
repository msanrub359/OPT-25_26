// models/Alumno.js
import mongoose from 'mongoose';

export const Curso = mongoose.model('Curso', new mongoose.Schema({

    idCurso: {
        type: String,
        required: true,
        trim: true, //quita espacios en blanco al principio y al final
        maxlength: 10,
        minlength: 2,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
       
    }
}, {
    timestamps: false,
    collection: 'cursos',
    versionKey: false
   
}));


