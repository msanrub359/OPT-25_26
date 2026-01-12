import { pool } from '../data/db.js';

// GET - Obtener todos los usuarios
export const addCalificacion =async (req, res) => {
      try {
        const {idAlumno, idCurso, idModulo, calificacion} =req.body;
        if (!idCurso || !idAlumno || !idModulo || !calificacion){
            return res.status(404).json({message:`idCurso, idAlumno, idModulo o calificación son todos requerido`})
        }
        const [result]= await pool.query("INSERT INTO calificaciones (idAlumno, idCurso,calificacion, idModulo) VALUES (?,?,?,?)", [idAlumno, idCurso,  calificacion, idModulo ]);
        console.log(result);
      
        res.status(201).json({message: `El id de la calificación ${result.insertId} ha sido grabada`})
         
    } catch (error) {
        res.status(500).json({message:`Error al obtener los cursos: ${error.message}`})

    }

}
