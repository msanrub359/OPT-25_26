"use strict"

import { Router } from 'express';
import { 
    getAlumnos, 
    getAlumno, 
    delAlumno, 
    addAlumno, 
    updateAlumno, 
    getAlumnoCurso
} from '../controllers/alumnos.controller.js';

import { validar, validarId, validarIdCurso, validarPatch } from '../validators/alumnos.validator.js';
import { autenticarToken, autorizarRol } from '../middlewares/auth.middleware.js';
const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// GET - Obtener todos los alumnos
router.get('/alumnos', autenticarToken, getAlumnos);

// GET - Obtener un alumno por ID
router.get('/alumnos/:id', autenticarToken, autorizarRol(['Admin', 'Visor']),validarId, getAlumno);

// POST - Crear nuevo alumno
router.post('/alumnos/', autenticarToken, autorizarRol(['Admin', 'Editor']),validar, addAlumno);

// PUT - Actualizar alumno completo
router.put('/alumnos/:id', autenticarToken, autorizarRol(['Admin', 'Editor']),validarId, validar, updateAlumno);


// DELETE - Eliminar alumno
router.delete('/alumnos/:id', autenticarToken, autorizarRol(['Admin']), validarId, delAlumno);

export { router as alumnosRoutes };
