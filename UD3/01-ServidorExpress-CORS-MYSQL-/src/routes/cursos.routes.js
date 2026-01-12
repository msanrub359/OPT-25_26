"use strict"

import { Router } from 'express';
import { getCursos } from '../controllers/cursos.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/cursos', getCursos);

export { router as cursosRoutes };
