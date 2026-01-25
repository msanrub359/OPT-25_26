"use strict"

import { Router } from 'express';
import { getModulos } from '../controllers/modulos.controller.js';
import { validarId } from '../validators/modulos.validator.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/modulos/:id', validarId, getModulos);


export { router as modulosRoutes };
