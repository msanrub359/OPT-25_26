// models/Alumno.js
import mongoose from 'mongoose';

export const Alumno = mongoose.model('Alumno', new mongoose.Schema({

    apellidosNombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 2
    },
    idCurso: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
        ref: 'Curso'
    }
}, {
    timestamps: false,
    collection: 'alumnos',
    versionKey: false
   
}));


