import { pool } from '../data/db.js';

/**
 * @function getModulos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getModulos = async (req, res) => {
 try {
    const {id} = req.params;
    if (!id){
      return res.status(400).json({message: `El id del curso debe incluirse en el endpoint`});
    }

    const result = await pool.query("SELECT * FROM modulos where idCurso=?", [id]);
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener módulos ${ error.message }`});
  }
}