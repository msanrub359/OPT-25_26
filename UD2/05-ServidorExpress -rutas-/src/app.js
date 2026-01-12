import express from 'express';
import {config} from 'dotenv';
import { usuariosRoutes} from './routes/usuario.routes.js';

config();
const app = express();
//Configurar puerto
const PORT = process.env.PORT || 3000;


// Usar las rutas directas); // No necesitas añadir un prefijo aquí
app.use('/api', usuariosRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API REST con Express.js',
        endpoints: {
            usuarios: '/api/usuarios'
        }
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
