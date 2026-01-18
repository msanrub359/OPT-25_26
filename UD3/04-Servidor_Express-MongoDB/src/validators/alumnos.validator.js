import { body, param, validationResult } from 'express-validator';

// Middleware reutilizable para manejar errores
const validationErrors = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ 
            errors: errores.array() 
        });
    }
    next();
};
// Validación de ID en parámetros de ruta
export const validarId = [
    param('id')
        .notEmpty().withMessage("El ID es requerido")
        .isAlphanumeric().withMessage("El ID debe contener solo letras y números")
        .isLength({min:24 ,max: 24 }).withMessage("El ID del curso debe tener 24 caracteres"),
    validationErrors //No lleva paréntesis porque Express necesita la función en sí, no el resultado de ejecutarla. Express la ejecutará más tarde cuando llegue una petición.
];

// Validación de ID en parámetros de ruta
export const validarIdCurso = [
    param('idCurso')
        .notEmpty().withMessage("El ID del curso es requerido")
        .isAlphanumeric().withMessage("El IDCurso debe contener letras y números")
        .isLength({min:3 ,max: 10 }).withMessage("El ID del curso debe tener entre 3 y 10 caracteres"),
    validationErrors //No lleva paréntesis porque Express necesita la función en sí, no el resultado de ejecutarla. Express la ejecutará más tarde cuando llegue una petición.
];

// Validación completa para POST y PUT
export const validar = [
    body('nameAl')
        .trim()
        .notEmpty().withMessage("El nombre del alumno es requerido")
        .isLength({ min: 5, max: 50 }).withMessage("El nombre debe tener entre 5 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ,\s]+$/).withMessage("El nombre solo puede contener letras y espacios")
        .customSanitizer(value => value.replace(/\s+/g, ' ').trim()), //sanitiza el texto. Reemplaza múltiples espacios seguidos por un solo espacio. trim() Elimina espacios al inicio y final.
    body('idCurso')
        .trim()
        .notEmpty().withMessage("El ID del curso es requerido")
        .isLength({ min: 3, max: 10 }).withMessage("El ID del curso debe tener entre 3 y 10 caracteres"),
    
    validationErrors
];




