// controllers/cursos.controller.js
import { Curso} from '../models//cursos.model.js';

/**
 * @function getCursos
 * @description Obtener todos los cursos
 */
export const getCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      order: [['descripcion', 'ASC']]
    });

    if (cursos.length === 0) {
      return res.status(200).json({ data: [] });
    }

    res.status(200).json({ 
      data: cursos.map(curso => curso.toJSON()) 
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener cursos", 
      error: error.message 
    });
  }
};

/**
 * @function getCursosConAlumnos
 * @description Obtener todos los cursos con sus alumnos
 */
export const getCursosConAlumnos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [{
        model: Alumno,
        as: 'alumnos',
        attributes: ['idAlumno', 'apellidosNombre']
      }],
      order: [
        ['descripcion', 'ASC'],
        [{ model: Alumno, as: 'alumnos' }, 'apellidosNombre', 'ASC']
      ]
    });

    if (cursos.length === 0) {
      return res.status(200).json({ data: [] });
    }

    res.status(200).json({ 
      data: cursos.map(curso => curso.toJSON()) 
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener cursos", 
      error: error.message 
    });
  }
};

/**
 * @function getCurso
 * @description Obtener un curso por ID
 */
export const getCurso = async (req, res) => {
  try {
    const { id } = req.params;
    
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({ 
        message: `No se encontró el curso con ID ${id}`,
        data: null 
      });
    }

    res.status(200).json({ data: curso.toJSON() });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener curso", 
      error: error.message 
    });
  }
};

/**
 * @function addCurso
 * @description Crear un nuevo curso
 */
export const addCurso = async (req, res) => {
  try {
    const { idCurso, descripcion } = req.body;

    const nuevoCurso = await Curso.create({
      idCurso,
      descripcion
    });

   

    res.status(201).json({ 
      message: `Creado el nuevo curso`
    });

  } catch (error) {
      res.status(500).json({ 
      message: "Error al insertar el curso", 
      error: error.message 
    });
  }
};

/**
 * @function updateCurso
 * @description Actualizar un curso completo (PUT)
 */
export const updateCurso = async (req, res) => {
  try {
   
    const { descripcion } = req.body;
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(400).json({
        message: 'El curso no existe'
      });
    }

    await curso.update({
      descripcion
    });

    res.status(200).json({
      message: 'El curso ha sido actualizado'
    });

  } catch (error) {
   
    res.status(500).json({ 
      message: "Error al actualizar el curso", 
      error: error.message 
    });
  }
};

/**
 * @function updatePatchCurso
 * @description Actualizar un curso parcialmente (PATCH)
 */
export const updatePatchCurso = async (req, res) => {
  try {
    console.log(req.body);
    const { descripcion } = req.body;
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(400).json({
        message: 'El curso no existe'
      });
    }

    const camposActualizar = {};
    if (descripcion !== undefined) {
      camposActualizar.descripcion = descripcion;
    }

    await curso.update(camposActualizar);


    res.status(200).json({
      message: 'El curso ha sido actualizado'
    });

  } catch (error) {
    
    res.status(500).json({ 
      message: "Error al actualizar el curso", 
      error: error.message 
    });
  }
};

/**
 * @function delCurso
 * @description Eliminar un curso (CASCADE elimina también sus alumnos)
 */
export const delCurso = async (req, res) => {
  try {
    console.log({ req });
    const { id } = req.params;
    
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(400).json({
        message: 'El curso no existe'
      });
    }

    // Como definimos onDelete: 'CASCADE', al borrar el curso
    // se borrarán automáticamente todos sus alumnos
    await curso.destroy();

    console.log('Curso borrado con ID:', id);

    return res.status(200).json({
      message: 'El curso ha sido borrado (y sus alumnos asociados)'
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al borrar el curso", 
      error: error.message 
    });
  }
};