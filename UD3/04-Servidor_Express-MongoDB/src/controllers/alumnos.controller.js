// import { pool } from '../data/db.js';
import { conexionBD } from '../data/db.js'
import { ObjectId } from 'mongodb';
/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getAlumnos = async (req, res) => {
  try {

    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.find({}).toArray();

    if (result.length == 0) { //para mostrar datos en tabulator
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
    const { id } = req.params;
    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.find({_id: new ObjectId(id)}).toArray();

    if (result.length == 0) { //para mostrar datos en tabulator
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

export const getAlumnoCurso = async (req, res) => {
  try {

    const { idCurso } = req.params

    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.find({ idCurso: idCurso }).toArray();
    if (result.length == 0) { //para mostrar datos en tabulator
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

    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.insertOne({ 
     
      apellidosNombre:nameAl,
      idCurso
     })
     console.log(result);
     res.status(201).json({ id: result.insertedId });
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

    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set:{
      apellidosNombre:nameAl,
      idCurso
     }})
     console.log(result);
    if (result.modifiedcount == 0) { //No exite el alumno
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
    const database = await conexionBD();
    const collection = database.collection("alumnos");
    //indicar la instrucción MQL
    const result = await collection.deleteOne(
      { _id: new ObjectId(id)})
     console.log(result);
    
    if (result.delectedCount == 0) {
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