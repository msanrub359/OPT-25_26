

import bcrypt from 'bcrypt'
import { Usuario } from "../models/usuarios.model.js";

export const getUsuarios = async (req, res) => {
    try {
        console.log('pasa');
        const usuarios = await Usuario.find()
            .sort({ apellidosNombre: 1 }); //orden ascendente -1 descendente

        res.status(200).json({ data: usuarios.length ? usuarios : [] });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener usuarios", error: error.message });
    }
}

export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findById(id).select('-password'); //excluy el campo password

        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json({ data: usuario });

    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener usuarios", error: error.message });
    }
};



export const addUsuario = async (req, res) => {
    try {

        const { name, email, password, role, active } = req.body;

        
        // Hashea la contraseña de forma segura
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // Crear usuario
        const nuevoUsuario = await Usuario.create({
            name,
            email,
            password: hashPassword,
            role: role || 'Usuario',
            active: active !== undefined ? active : false,

        });


        res.status(201).json({ id: nuevoUsuario._id });
    } catch (error) {
        res.status(500).json(
            { message: "Error al insertar el usuario", error: error.message }
        )

    };
}

export const updateUsuario = async (req, res) => {
    try {

        const { name, email, password, role, active } = req.body;
        const { id } = req.params;

        // Verificar que el usuario existe
        const usuarioExist = await Usuario.findById(id);

        if (!usuarioExist) {
            return res.status(400).json({ message: `El usuario "${idCurso}" no existe` });
        }

        // Convertir string vacío a null y encriptar si tiene valor
    const hashPassword = password && password.trim() !== ''
      ? await bcrypt.hash(password, 10)
      : null;
        const usuario = await Usuario.findByIdAndUpdate(
            id,  //filtro
            { name, email,password:hashPassword,role, active }, //datos a actualizar
            { new: true, runValidators: true });//devolver documento actualizado y aplica validaciones.


        res.status(200).json({ message: `Usuario actualizado ${usuario._id}  ` });


    } catch (error) {
        res.status(500).json(
            { message: "Error al actualizar el usuario", error: error.message }
        )
    }

}

export const delUsuario = async (req, res) => {

    try {
        
        const { id } = req.params
        // 1. Verificar que el usuario existe
        const usuario = await Usuario.findById(id);
      
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // 2. Evitar que un usuario se elimine a sí mismo (opcional)
        
         console.log(usuario);
        if (usuario._id === id) {
            return res.status(400).json({
                message: 'No puedes eliminar tu propia cuenta'
            });
        }
        
        // 3. Evitar eliminar al último Admin (opcional pero recomendado)
        if (usuario.role === 'Admin') {
            const totalAdmins = await User.countDocuments({ role: 'Admin' });

            if (totalAdmins <= 1) {
                return res.status(400).json({
                    message: 'No se puede eliminar al último administrador del sistema'
                });
            }
        }
       
        await Usuario.findByIdAndDelete(id);

        res.status(200).json({ message: 'Usuario borrado' });
    } catch (error) {
        res.status(500).json(
            { message: "Error al borrar el Usuario", error: error.message }
        )
    }
};

/**
 * @description Generar password
 */

const generarPassword = async () => {
    // Genera un valor aleatorio seguro (8 caracteres hex)
    const random = crypto.randomBytes(4).toString('hex');
    // Hashea la contraseña de forma segura
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(pass, saltRounds);
    return hashPassword;
}
