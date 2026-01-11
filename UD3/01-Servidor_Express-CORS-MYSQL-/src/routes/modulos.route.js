"use strict"

import { Router } from 'express';
import { getModulos } from '../controllers/modulos.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/modulos/:id', getModulos);


export { router as modulosRoutes };
