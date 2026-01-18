"use strict"

import { Router } from 'express';
// import { postCalificaciones } from '../controllers/calificaciones.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
// router.post('/calificaciones', postCalificaciones);


export { router as calificacionesRoutes };
