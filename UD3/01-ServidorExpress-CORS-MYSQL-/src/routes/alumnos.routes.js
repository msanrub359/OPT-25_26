"use strict"

import { Router } from 'express';
import { getAlumnos } from '../controllers/alumnos.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo

router.get('/alumnos/:idCurso', getAlumnos);


export { router as alumnosRoutes };
