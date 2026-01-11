import { pool, query } from '../data/db.js';

/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getAlumnos = async (req, res) => {
 try {
    const {id} = req.params;
    if (!id){
      return res.status(400).json({message: `El id del curso debe incluirse en el endpoint`});
    }

    const result = await query("SELECT * FROM Alumnos where idCurso=?", [id]);
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener alumnos ${ error.message }`});
  }
}