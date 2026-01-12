import express from 'express';
import {config} from 'dotenv';
import { usuariosRoutes} from './routes/usuario.routes.js';

config();
const server = express();
//Configurar puerto
const PORT =  process.env.PORT || 3000;

server.use(express.json()); // Para parsear JSON en el body

// Usar las rutas directas); // No necesitas añadir un prefijo aquí
server.use('/api', usuariosRoutes);

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

