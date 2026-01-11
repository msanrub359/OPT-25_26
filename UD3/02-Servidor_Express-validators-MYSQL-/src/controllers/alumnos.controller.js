import { pool } from '../data/db.js';

/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getAlumnos = async (req, res) => {
  try {

    const result = await pool.query("SELECT * FROM Alumnos");
    if (result.length ==0){ //para mostrar datos en tabulator
      return res.status(200).json({ data: [] });
    }
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
}

export const getAlumno = async (req, res) => {
  try {

    const { id } = req.params
    const [result] = await pool.query("SELECT * FROM alumnos where idAlumno=?", [id]);
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const getAlumnoCurso = async (req, res) => {
  try {

    const { idCurso } = req.params
    const [result] = await pool.query("SELECT * FROM alumnos where idCurso=?", [idCurso]);

    if (result.length ==0){ //para mostrar datos en tabulator
      return res.status(200).json({ data: [] });
    }
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const addAlumno = async (req, res) => {
  try {

    const { nameAl, idCurso } = req.body;

    const [result] = await pool.query("INSERT INTO alumnos (apellidosNombre, idCurso) VALUES (?,?)", [nameAl, idCurso]);

    res.status(201).json({ data: result, id: result.insertId });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el alumno", error: error.message }
    )

  };
}

  export const updateAlumno = async (req, res) => {
    try {
      console.log(req.body);
      const { nameAl, idCurso } = req.body;
      const { id } = req.params;

      const [result] = await pool.query("UPDATE alumnos SET apellidosNombre=?, idCurso=? WHERE idAlumno=?", [nameAl, idCurso, id]);

      if (result.affectedRows == 0) { //No exite el alumno
        return res.status(400).json({
          message: 'El alumno no existe'
        })
      }
      res.status(200).json({
        message: 'El alumno ha sido actualizado'
      })


    } catch (error) {
      res.status(500).json(
        { message: "Error al actualizar el alumno", error: error.message }
      )
    }

  }

  export const updatePatchAlumno = async (req, res) => {
    try {
      console.log(req.body);
      const { nameAl, idCurso } = req.body;
      const { id } = req.params;

      const [result] = await pool.query("UPDATE alumnos SET apellidosNombre=IFNULL(?,apellidosNombre), idCurso=IFNULL(?, idCurso) WHERE idAlumno=?", [nameAl, idCurso, id]);

      console.log(result);
      if (result.affectedRows == 0) {
        return res.status(400).json({
          message: 'El alumno no existe'
        })
      }

      res.status(200).json({
        message: 'El alumno ha sido actualizado'
      })


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
      const [result] = await pool.query("DELETE FROM alumnos WHERE idAlumno=?", [id]);
      console.log('borrado', result);
      if (result.affectedRows == 0) {
        return res.status(400).json({
          message: 'El alumno no existe'
        })
      } else {
        return res.status(200).json({
          message: 'El alumno ha sido borrado'
        })
      }
    } catch (error) {
       res.status(500).json(
        { message: "Error al borrar el alumno", error: error.message }
      )
    }
  };