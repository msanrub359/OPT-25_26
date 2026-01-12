import { pool } from '../data/db.js';

// GET - Obtener todos los alumnos
export const getAlumnos =async (req, res) => {
    try {
        const {idCurso} =req.params;
        if (!idCurso){
            return res.status(404).json({message:`El id del curso debe incluirse en la ruta`})
        }
        const [result]= await pool.query("Select * from alumnos where idCurso=?", [idCurso]);
      
        res.status(200).json({data: result})
         
    } catch (error) {
        res.status(500).json({message:`Error al obtener los alumnos: ${error.message}`})

    }

}
