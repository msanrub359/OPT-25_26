"use strict"

import { Router } from 'express';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/usuarios',  (req, res) => {
    res.send('Obteniendo usuarios' );
});

router.post('/usuarios', (req, res) => {
    res.send('Creando un usuario' );
});

router.put('/usuarios',  (req, res) => {
    res.send('Actualizando total un usuario');
});

router.patch('/usuarios',  (req, res) => {
    res.send('Actualizando parcialmente un usuario');
});

router.delete('/usuarios',  (req, res) => {
    res.send('Borrando un usuario' );
});

export { router as usuariosRoutes };
