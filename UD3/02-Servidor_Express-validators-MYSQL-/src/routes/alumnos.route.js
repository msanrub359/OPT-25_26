"use strict"

import { Router } from 'express';
import { 
    getAlumnos, 
    getAlumno, 
    delAlumno, 
    addAlumno, 
    updateAlumno, 
    getAlumnoCurso, 
    updatePatchAlumno 
} from '../controllers/alumnos.controller.js';

import { validar, validarId, validarIdCurso, validarPatch } from '../validators/alumnos.validator.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// GET - Obtener todos los alumnos
router.get('/alumnos', getAlumnos);

// GET - Obtener alumnos por curso
router.get('/alumnos/curso/:idCurso', validarIdCurso, getAlumnoCurso);

// GET - Obtener un alumno por ID
router.get('/alumnos/:id', validarId, getAlumno);

// POST - Crear nuevo alumno
router.post('/alumnos/', validar, addAlumno);

// PUT - Actualizar alumno completo
router.put('/alumnos/:id', validarId, validar, updateAlumno);

// PATCH - Actualizar alumno parcialmente
router.patch('/alumnos/:id', validarId, validarPatch, updatePatchAlumno);

// DELETE - Eliminar alumno
router.delete('/alumnos/:id', validarId, delAlumno);

export { router as alumnosRoutes };
