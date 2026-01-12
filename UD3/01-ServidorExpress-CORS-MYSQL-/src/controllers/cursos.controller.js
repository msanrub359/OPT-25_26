import { pool } from '../data/db.js';

// GET - Obtener todos los usuarios
export const getCursos =async (req, res) => {
    try {
        const [result]= await pool.query("Select * from cursos");
        console.log(result);
        res.status(200).json({data: result})
         
    } catch (error) {
        res.status(500).json({message:`Error al obtener los cursos: ${error.message}`})

    }

}
