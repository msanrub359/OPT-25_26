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

// Validación completa para POST 
export const validar = [
    body('idCurso')
        .trim()
        .notEmpty().withMessage("El ID del curso es requerido")
        .isLength({ max: 8 }).withMessage('El id del módulo no puede superar 8 caracteres')
        .matches(/^[A-Z]+$/).withMessage("El ID del módulo solo puede contener letras"),

    body('idModulo')
        .trim()
        .notEmpty().withMessage("La descripción del módulo es requerida")
        .isLength({ min: 5, max: 50 }).withMessage("La descripción debe tener entre 5 y 50 caracteres")
        .customSanitizer(value =>
            value.toLowerCase().split(' ').map(palabra => `${palabra.charAt(0).toUpperCase()} ${palabra.slice(1)}`)
        ),
    body('idAlumno')
        .trim()
        .notEmpty().withMessage("El ID es requerido"),
    
    validationErrors
];




