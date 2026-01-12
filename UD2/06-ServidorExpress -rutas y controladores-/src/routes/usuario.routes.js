"use strict"

import { Router } from 'express';
import { getUsuarios, getUsuario,addUsuario,updateUsuario, patchUsuario, delUsuario } from '../controllers/usuario.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/usuarios', addUsuario);
router.put('/usuarios/:id',  updateUsuario);
router.patch('/usuarios/:id',  patchUsuario);
router.delete('/usuarios/:id', delUsuario);

export { router as usuariosRoutes };
