import { pool } from '../data/db.js';

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

export const getCurso = async (req, res) => {
  try {

    const { id } = req.params
    const [result] = await pool.query("SELECT * FROM cursos where idCurso=?", [id]);
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el curso", error: error.message });
  }
};


export const addCurso = async (req, res) => {
  try {

    const { idCurso, descrip } = req.body;

    const [result] = await pool.query("INSERT INTO cursos (idCurso, descripcion) VALUES (?,?)", [idCurso, descrip]);

    res.status(201).json({ data: result, id: result.insertId });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el curso", error: error.message }
    )

  };
}

  export const updateCurso = async (req, res) => {
    try {
      console.log(req.body);
      const {  idCurso, descrip } = req.body;
      const { id } = req.params;

      const [result] = await pool.query("UPDATE cursos SET idCurso=?, descripcion=? WHERE idCurso=?", [idCurso, descrip]);

      if (result.affectedRows == 0) { //No exite el curso
        return res.status(400).json({
          message: 'El curso no existe'
        })
      }
      res.status(200).json({
        message: 'El curso ha sido actualizado'
      })


    } catch (error) {
      res.status(500).json(
        { message: "Error al actualizar el curso", error: error.message }
      )
    }

  }

  export const updatePatchCurso = async (req, res) => {
    try {
      console.log(req.body);
      const { idCurso, descrip } = req.body;
      const { id } = req.params;

      const [result] = await pool.query("UPDATE cursos SET idCurso=IFNULL(?,idCurso), descripcion=IFNULL(?, descripcion) WHERE idCurso=?", [idCurso, descrip]);

      console.log(result);
      if (result.affectedRows == 0) {
        return res.status(400).json({
          message: 'El curso no existe'
        })
      }

      res.status(200).json({
        message: 'El curso ha sido actualizado'
      })


    } catch (error) {
      res.status(500).json(
        { message: "Error al actualizar el curso", error: error.message }
      )
    }

  }

  export const delCurso = async (req, res) => {

    try {
      console.log({ req });
      const { id } = req.params
      const [result] = await pool.query("DELETE FROM cursos WHERE idCurso=?", [id]);
      console.log('borrado', result);
      if (result.affectedRows == 0) {
        return res.status(400).json({
          message: 'El curso no existe'
        })
      } else {
        return res.status(200).json({
          message: 'El curso ha sido borrado'
        })
      }
    } catch (error) {
      res.status(500).json(
        { message: "Error al borrar el curso", error: error.message }
      )
    }
  };