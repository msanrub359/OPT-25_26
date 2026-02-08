// controllers/alumnos.controller.js
import { Alumno } from '../models/alumnos.model.js';
import { Curso } from '../models/cursos.model.js';

/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getAlumnos = async (req, res) => {
  try {

    const alumnos = await Alumno.find()
        .sort({ apellidosNombre: 1 }); //orden ascendente -1 descendente

    res.status(200).json({ data: alumnos.length ? alumnos : [] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
}

export const getAlumno = async (req, res) => {
  try {
    const {id} =req.params
    console.log(id);
    const alumno = await Alumno.findById(id)
    
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

    res.status(200).json({ data: alumno });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const getAlumnoCurso = async (req, res) => {
  try {

    const { idCurso } = req.params

    const alumnos = await Alumno.find({ idCurso: idCurso})
          .sort({ apellidosNombre: 1 });

    res.status(200).json({ data: alumnos.length ? alumnos : [] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const addAlumno = async (req, res) => {
  try {

    const { nameAl, idCurso } = req.body;

    const cursoExiste = await Curso.findOne({ idCurso });
    if (!cursoExiste) {
      return res.status(400).json({ message: `El curso "${idCurso}" no existe` });
    }

    const nuevoAlumno = await Alumno.create({apellidosNombre:nameAl, idCurso});
    console.log(nuevoAlumno);

    res.status(201).json({ id: nuevoAlumno._id });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el alumno", error: error.message }
    )

  };
}

export const updateAlumno = async (req, res) => {
  try {

    const { nameAl, idCurso } = req.body;
    const { id } = req.params;

    const cursoExiste=await Curso.findOne({ idCurso });

   if (!cursoExiste) {
      return res.status(400).json({ message: `El curso "${idCurso}" no existe` });
    }

    const alumno = await Alumno.findOneAndUpdate(
      { _id: id }, //filtro
      { apellidosNombre: nameAl, idCurso }, //datos a actualizar
      { new: true, runValidators: true });//devolver documento actualizado y aplica validaciones.
    

    if (!alumno) return res.status(404).json({ message: 'Alumno no existe' });

    res.status(200).json({ message: `Alumno actualizado ${alumno._id}  `});


  } catch (error) {
    res.status(500).json(
      { message: "Error al actualizar el alumno", error: error.message }
    )
  }

}

export const delAlumno = async (req, res) => {

  try {
    console.log({ req });
    const { id } = req.params
    const alumno = await Alumno.findByIdAndDelete(id);

    if (!alumno) return res.status(404).json({ message: 'Alumno no existe' });

    res.status(200).json({ message: 'Alumno borrado' });
  } catch (error) {
    res.status(500).json(
      { message: "Error al borrar el alumno", error: error.message }
    )
  }
};

// | Operación        | Método Mongoose                                | Descripción                                                        |
// | ---------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
// | **Crear**        | `Model.create(data)`                           | Inserta un nuevo documento                                         |
// | **Leer (todos)** | `Model.find(query)`                            | Obtiene todos o filtrados                                          |
// | **Leer (uno)**   | `Model.findById(id)`                           | Busca por `_id`                                                    |
// |                  | `Model.findOne(query)`                         | Busca un documento que cumpla condición                            |
// | **Actualizar**   | `Model.findByIdAndUpdate(id, update, options)` | Actualiza por `_id` y devuelve nuevo documento con `{ new: true }` |
// |                  | `Model.updateOne(query, update)`               | Actualiza el primero que cumple consulta                           |
// | **Eliminar**     | `Model.findByIdAndDelete(id)`                  | Elimina por `_id`                                                  |
// |                  | `Model.deleteOne(query)`                       | Elimina el primero que cumple consulta                             |
// | **Contar**       | `Model.countDocuments(query)`                  | Cuenta documentos                                                  |
