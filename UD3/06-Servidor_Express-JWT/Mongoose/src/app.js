import express from 'express';
import cookieParser from 'cookie-parser'

import cors from 'cors';

import { cursosRoutes } from './routes/cursos.route.js';
// import { modulosRoutes } from './routes/modulos.route.js';
import { alumnosRoutes } from './routes/alumnos.route.js';
import {usuariosRoutes} from './routes/usuarios.route.js';
import {authRoutes} from './routes/auth.route.js'
// import { calificacionesRoutes } from './routes/calificaciones.route.js';

import { conexionBD } from './data/db.js';

import {PORT} from './config.js'
import { cookie } from 'express-validator';


const app = express();


const corsOption ={
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(cors(corsOption)); //habilitar cors
app.use(cookieParser()); //Para poder leer cookies automáticamente
app.use(express.json()); // Para parsear JSON en el body

// Usar las rutas directas); // No necesitas añadir un prefijo aquí
app.use('/api', cursosRoutes);
// app.use('/api', modulosRoutes);
app.use('/api', alumnosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', authRoutes);
// app.use('/api', calificacionesRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API REST con Express.js',
    })
});
// Manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Página no encontrada' });
});

// Iniciar el servidor
conexionBD()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        })
    })
    .catch (err=>{
        console.log('No se pudo iniciar el servidor', err.message);
        process.exit(1); //salir si no ha conexión
    })


