"use strict"

import { Router } from 'express';


import { 
    getCurso, 
    getCursos, 
    delCurso, 
    addCurso, 
    updateCurso
} from '../controllers/cursos.controller.js';

import { validar, validarId } from '../validators/cursos.validator.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/cursos', getCursos);
// GET - Obtener un alumno por ID
router.get('/cursos/:id', validarId, getCurso);

// POST - Crear nuevo Curso
router.post('/cursos/', validar, addCurso);

// PUT - Actualizar Curso completo
router.put('/cursos/:id', validarId, validar, updateCurso);



// DELETE - Eliminar Curso
router.delete('/cursos/:id', validarId, delCurso);


export { router as cursosRoutes };

