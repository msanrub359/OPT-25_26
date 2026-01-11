import { pool, query } from '../data/db.js';

/**
 * @function postCalificaciones
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const postCalificaciones = async (req, res) => {
 try {
    const {idAlumno, idCurso, idModulo, calificacion} = req.body;
    if (!idAlumno || !idCurso || !idModulo || !calificacion){
      return res.status(400).json({message: `El idAlumno, idCurso, idModulo o calificación tiene que pasarse al body`});
    }

    const result = await query("INSERT INTO calificaciones (idAlumno, idCurso, idModulo, calificacion) VALUES (?, ?, ?, ?)", [idAlumno, idCurso, idModulo, calificacion]);
    console.log(result);
    res.status(201).json({message:`La calficación ha sido grabada`});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al grabar la calificación ${ error.message }`});
  }
}