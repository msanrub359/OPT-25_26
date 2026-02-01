// models/Alumno.js
import mongoose from 'mongoose';

export const Usuario = mongoose.model('Usuario', new mongoose.Schema({

   name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
      maxlength: [100, 'El nombre debe tener como máximo 100 caracteres'],
      trim: true
    },
   email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Debe proporcionar un email válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
      maxlength: [255]
    },
    role: {
      type: String,
      enum: {
        values: ['Admin', 'Usuario', 'Editor', 'Visor'],
        message: 'El rol debe ser: Admin, Usuario, Editor o Visor'
      },
      default: 'Usuario',
      required: true
    },
   active: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: false,
    collection: 'usuarios',
    versionKey: false
   
}));
