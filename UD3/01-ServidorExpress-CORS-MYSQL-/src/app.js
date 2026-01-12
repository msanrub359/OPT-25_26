import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';

import { modulosRoutes } from './routes/modulos.routes.js';
import { alumnosRoutes } from './routes/alumnos.routes.js';
import { calificacionesRoutes } from './routes/calificaciones.routes.js';
import { cursosRoutes } from './routes/cursos.routes.js';

config();
const server = express();
//Configurar puerto
const PORT =  process.env.PORT || 3000;
//configurar cors
const optCors={
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
server.use(cors(optCors));

server.use(express.json()); // Para parsear JSON en el body

// Usar las rutas directas); // No necesitas añadir un prefijo aquí
server.use('/api', cursosRoutes);
server.use('/api', modulosRoutes);
server.use('/api', alumnosRoutes);
server.use('/api', calificacionesRoutes);


server.get('/', (req, res) => {
    res.json({
        message: 'API REST con Express.js',
        endpoints: {
            usuarios: '/api/usuarios'
        }
    })
});
// Manejar rutas no encontradas (404)
server.use((req, res) => {
    res.status(404).json({ message: 'Página no encontrada' });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

