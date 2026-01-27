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

// | Atributo    | Descripción                                 | Ejemplo                                                       |
// | ----------- | ------------------------------------------- | ------------------------------------------------------------- |
// | `type`      | Define el tipo de dato del campo            | `name: { type: String, Number, Boolean, Date, Buffer, Object, Array, Map }`                                      |
// | `required`  | Campo obligatorio                           | `email: { type: String, required: true }`                     |
// | `trim`      | Elimina espacios al inicio y final (string) | `name: { type: String, trim: true }`                          |
// | `lowercase` | Convierte el valor a minúsculas (string)    | `email: { type: String, lowercase: true }`                    |
// | `uppercase` | Convierte el valor a mayúsculas (string)    | `code: { type: String, uppercase: true }`                     |
// | `minlength` | Longitud mínima (string)                    | `username: { type: String, minlength: 3 }`                    |
// | `maxlength` | Longitud máxima (string)                    | `username: { type: String, maxlength: 20 }`                   |
// | `min`       | Valor mínimo (number)                       | `age: { type: Number, min: 0 }`                               |
// | `max`       | Valor máximo (number)                       | `score: { type: Number, max: 100 }`                           |
// | `enum`      | Permite solo ciertos valores                | `role: { type: String, enum: ['user','admin']}`               |
// | `default`   | Valor por defecto                           | `active: { type: Boolean, default: true }`                    |
// | `unique`    | Debe ser único en la colección              | `email: { type: String, unique: true }`                       |
// | `index`     | Crea un índice                              | `name: { type: String, index: true }`                         |
// | `select`    | Oculta o muestra el campo en consultas      | `password: { type: String, select: false }`                   |
// | `immutable` | No puede modificarse después de crearse     | `createdAt: { type: Date, immutable: true }`                  |
// | `alias`     | Nombre alternativo para acceder al campo    | `firstName: { type: String, alias: 'nombre' }`                |
// | `match`     | Valida con una expresión regular            | `email: { type: String, match: /.+@.+\..+/ }`                 |
// | `validate`  | Validación personalizada                    | `status: { type: String, validate: v => v==='ok' }`           |
// | `ref`       | Referencia a otro modelo                    | `user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }` |





