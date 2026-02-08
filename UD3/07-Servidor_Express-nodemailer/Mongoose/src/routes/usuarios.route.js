"use strict"

import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuario, 
    addUsuario,
    delUsuario, 
    updateUsuario 
   
} from '../controllers/usuarios.controller.js';

import { validarRegistro, validarId  } from '../validators/usuarios.validator.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

//Rutas públicas sin autenticación


router.get('/usuarios', getUsuarios); //solo Admin y Editor
router.get('/usuarios/:id', validarId, getUsuario); //solo usuarios autenticados
router.post('/usuarios',  validarRegistro, addUsuario);
router.put('/usuarios/:id',  validarId, validarRegistro, updateUsuario); //Admin y Editor
router.delete('/usuarios/:id', validarId, delUsuario); //solo Admin y Editor




export { router as usuariosRoutes };