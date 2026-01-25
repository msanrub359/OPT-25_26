import express from 'express';
import cors from 'cors';


import { cursosRoutes } from './routes/cursos.route.js';
import { modulosRoutes } from './routes/modulos.route.js';
import { alumnosRoutes } from './routes/alumnos.route.js';
import { calificacionesRoutes } from './routes/calificaciones.route.js';
import {PORT} from './config.js'


const app = express();

const corsOption ={
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(cors(corsOption)); //habilitar cors

app.use(express.json()); // Para parsear JSON en el body

// Usar las rutas directas); // No necesitas añadir un prefijo aquí
app.use('/api', cursosRoutes);
app.use('/api', modulosRoutes);
app.use('/api', alumnosRoutes);
app.use('/api', calificacionesRoutes);

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
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
