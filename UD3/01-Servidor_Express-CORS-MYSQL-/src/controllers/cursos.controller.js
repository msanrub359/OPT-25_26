import { pool, query } from '../data/db.js';

/**
 * @function getCursos
 * @description extraer todos los cursos
 * @param {*} req 
 * @param {*} res 
 */
export const getCursos = async (req, res) => {
 try {
    const [result] = await pool.query("SELECT * FROM cursos");
     console.log(result);
     res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener cursos ${ error.message }`});
  }
}

// export const getCursos = async (req, res) => {
//  try {
//     const result = await query("SELECT * FROM cursos");
//     console.log(result);
//     res.status(200).json({data: result});
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error al obtener cursos ${ error.message }`});
//   }
// }