import bcrypt from 'bcrypt'
import { Usuario } from '../models/usuarios.model.js';
import { generarAccessToken, generarRefreshToken, verificarRefreshToken} from '../middlewares/auth.middleware.js';
import { enviarEmailActivacion } from '../mailer.js';

// REGISTRO de nuevo usuario
export const register = async (req, res) => {
    try {
        
        const { name, email, password, role, active } = req.body;
        // Hashea la contraseña de forma segura
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Crear token de activación provisional para la activación de la cuenta.
      
        // Crear nuevo usuario 
        const nuevoUsuario = await Usuario.create({
            name,
            email,
            password: hashPassword,
            role: role || 'Usuario',
            active: active !== undefined ? active : false
        });
        
        //enviar email de activación
       

        // Preparar payload para los tokens (SIN password)
        const payload = {
            id: nuevoUsuario._id,
            email: nuevoUsuario.email,
            role: nuevoUsuario.role
        };

        // Generar tokens
        const accessToken = generarAccessToken(payload);
        const refreshToken = generarRefreshToken(payload);
   
        // Guardar refresh token en el navegador junto con la respuesta Http
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //La cookie no se puede leer con JavaScript
            secure: false, //La cookie solo se envia por HTTPS. True en producción
            sameSite: 'strict', //Evita que la cookie sea enviada desde otros sitios
            path: '/api/refresh-token' //la cookie solo se enviará a ese endpoint
        });
   
        
        res.status(201).json({
            message: 'Usuario registrado exitosamente. Por favor, revisa tu email para activar tu cuenta.   ',
            data: { id: nuevoUsuario._id, accessToken }

        });

    } catch (error) {
        // Error de duplicado (email único)
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            });
        }

        // Error de validación de Mongoose
        if (error.name === 'ValidationError') {
          
            return res.status(400).json({
                message: 'Error de validación'
            });
        }

        // Error general
        res.status(500).json({
            message: 'Error al registrar usuario'
        });
    }
};

// LOGIN de usuario existente
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email (incluir password con +password)
        const usuario = await Usuario.findOne({ email });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.active) {
            return res.status(403).json({
                message: 'Usuario inactivo. Contacte al administrador'
            });
        }

        // Verificar contraseña
        // Verificar la contraseña, comparar con bcrypt
        const validPass = await bcrypt.compare(password, usuario.password);

        if (!validPass) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Preparar payload para los tokens
        const payload = {
            id: usuario._id,
            email: usuario.email,
            role: usuario.role
        };

        // Generar tokens
        const accessToken = generarAccessToken(payload);
        const refreshToken = generarRefreshToken(payload);

        //guardar el refreshToken
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/api/refresh-token'
        });

        res.status(200).json({
            message: 'Login exitoso',
            data: { accessToken }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error en el login'
        });
    }
};

// REFRESH TOKEN - Renovar access token
export const refreshToken = async (req, res) => {
    try {
       
       //se recupera el resfreshToken de la petición
        const token = req.cookies.refreshToken;
      

        if (!token) return res.status(401).json({ message: 'Refresh token no proporcionado' });

        const payload = verificarRefreshToken(token); // tu función de JWT
        
        if (!payload) return res.status(401).json({ message: 'Refresh token inválido o expirado' });

        // Buscar usuario en la base de datos
       
        const usuario = await Usuario.findById(payload.id);
      
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        if (!usuario.active) return res.status(403).json({ message: 'Usuario inactivo' });
            
           

        // quitar el ataributo iat y exp 
        const { iat, exp, ...payloadBis } = payload;
         // Generar nuevos tokens
         
        const nuevoAccessToken = generarAccessToken(payloadBis);
        console.log('pasa');
        const nuevoRefreshToken = generarRefreshToken(payloadBis);
       
        // Guardar refresh token en el navegador junto con la respuesta Http
        res.cookie('refreshToken', nuevoRefreshToken, {
            httpOnly: true, //La cookie no se puede leer con JavaScript
            secure: false, //La cookie solo se envia por HTTPS. True en producción
            sameSite: 'strict', //Evita que la cookie sea enviada desde otros sitios
            path: '/api/refresh-token' //la cookie solo se enviará a ese endpoint
        });
        res.status(200).json({
            message: 'Token renovado exitosamente',
            accessToken: nuevoAccessToken
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al renovar token',
           
        });
    }
};

// construir el contenido HTML del email de activación
const contenidoHTML = (email, name, tokenActivacion) => {
    
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f9f9f9; }
                    .button { 
                        display: inline-block; 
                        padding: 12px 30px; 
                        background-color: #4CAF50; 
                        color: white; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        margin: 20px 0;
                    }
                    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>¡Bienvenido/a ${name}!</h1>
                    </div>
                    <div class="content">
                        <p>Gracias por registrarte en nuestra plataforma.</p>
                        <p>Para completar tu registro y activar tu cuenta, haz clic en el siguiente botón:</p>
                        <div style="text-align: center;">
                            <a href="${urlActivacion}" class="button">Activar mi cuenta</a>
                        </div>
                        <p><strong>Este enlace expirará en 24 horas.</strong></p>
                       
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} ${process.env.URL} || 'Tu App'}. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
 


export const activaCuenta = async (req, res) => {
     try {
           
            
         
     } catch (error) {
         console.error('Error al activar cuenta:', error);
         res.status(500).json({ message: 'Error al activar la cuenta' });
     }           
};

