import { usuarios } from '../data/usuarios.js';

// GET - Obtener todos los usuarios
export const getUsuarios = (req, res) => {

    return res.status(200).json({
        data: usuarios,
        total: usuarios.length
    });

};

// GET - Obtener un usuario por ID
export const getUsuario = (req, res) => {

    const { id } = req.params;
    // Validar que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({

            message: 'El ID debe ser un número válido'
        });
    }
    //búsqueda del id del usuario 
    const usuario = usuarios.find(user => user.id === Number(id));

    if (!usuario) {
        return res.status(404).json({

            message: `Usuario con ID ${id} no encontrado`
        });
    }

    return res.status(200).json({

        data: usuario
    });


};

// POST - Crear un nuevo usuario
export const addUsuario = (req, res) => {
    
    const { id, nombre, email, edad } = req.body;

    if (id.length == 0 || nombre.length == 0 || email.length == 0 || edad.length == 0) {
        return res.status(400).json({

            message: 'Los atributos no pueden estar en blanco'
        });
    }
    //comprobar que el id sea un número
    if (isNaN(id)) {
        return res.status(400).json({

            message: 'El ID debe ser un número válido'
        });
    }
    //comprobamos que el email no esté repetido
    const emailExiste = usuarios.find(user => user.email == email);
    if (emailExiste) {
        return res.status(400).json({

            message: 'Ya existe un usuario con ese email'
        });
    }
    usuarios.push(req.body)
    return res.status(201).json({
        message: `El usuario con Id ${id} ha sido grabado`
    })

};

// PUT - Actualizar un usuario completo
export const updateUsuario = (req, res) => {
    const { id } = req.params
    //validar que el Id exista y que sea un número
    if (!id) {
        return res.status(400).json({
            message: 'El Id es requerido en la URL'
        })
    }
    //comprobar que el id sea un número
    if (isNaN(id)) {
        return res.status(400).json({

            message: 'El ID debe ser un número válido'
        });
    }
    const { nombre, email, edad } = req.body;

    if ( nombre.length == 0 || email.length == 0 || edad.length == 0) {
        return res.status(400).json({

            message: 'Los atributos no pueden estar en blanco'
        });
    }
    const existeId = usuarios.findIndex(user => user.id == id);
    if (existeId){
       // usuarios[existeId]=req.body;
       usuarios[existeId]={
        id,
        nombre,
        email,
        edad
       }
        return res.status(200).json({
            message:`Actualización del Id ${id} ha sido correcta`,
            data: usuarios[existeId]
        })
    }

};

// PATCH - Actualizar solo el emial
export const patchUsuario = (req, res) => {
const { id } = req.params
    //validar que el Id exista y que sea un número
    if (!id) {
        return res.status(400).json({
            message: 'El Id es requerido en la URL'
        })
    }
    //comprobar que el id sea un número
    if (isNaN(id)) {
        return res.status(400).json({

            message: 'El ID debe ser un número válido'
        });
    }
    const { email } = req.body;
    
    if ( email.length == 0 ) {
        return res.status(400).json({

            message: 'El email no puede estar en blanco'
        });
    }
    const existeId = usuarios.findIndex(user => user.id == id);
    if (existeId){
        usuarios[existeId].email=email; //actualizamos solo el email.
        return res.status(200).json({
            message:`Actualización del email del Id ${id} ha sido correcta`,
            data: usuarios[existeId]
        })
    }

};

// DELETE - Eliminar un usuario
export const delUsuario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({

            message: 'El ID debe ser un número válido'
        });
    }
    //búsqueda del id del usuario 
    const usuario = usuarios.findIndex(user => user.id == id);

    if (usuario == -1) {
        return res.status(404).json({

            message: `Usuario con ID ${id} no encontrado`
        });
    }

    usuarios.splice(usuario, 1);

    return res.status(200).json({
        message: `El usuario con Id ${id} ha sido eliminado`

    })
};