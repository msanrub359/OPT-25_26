import { conexionBD } from '../data/db.js'
import { ObjectId } from 'mongodb';
/**
 * @function getCursos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getCursos = async (req, res) => {
  try {

    const database = await conexionBD();
    const collection = database.collection("cursos");
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
      .json({ message: "Error al obtener cursos", error: error.message });
  }
}

export const getCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const database = await conexionBD();
    const collection = database.collection("cursos");
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
      .json({ message: "Error al obtener cursos", error: error.message });
  }
};


export const addCurso = async (req, res) => {
  try {

    const { descripcion, idCurso } = req.body;

    const database = await conexionBD();
    const collection = database.collection("cursos");
    //indicar la instrucción MQL
    const result = await collection.insertOne({ 
     
      descripcion,
      idCurso
     })
     console.log(result);
     res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el curso", error: error.message }
    )

  };
}

export const updateCurso = async (req, res) => {
  try {
    console.log(req.body);
    const { descripcion, idCurso } = req.body;
    const { id } = req.params;

    const database = await conexionBD();
    const collection = database.collection("cursos");
    //indicar la instrucción MQL
    const result = await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set:{
      descripcion,
      idCurso
     }})
     console.log(result);
    if (result.modifiedcount == 0) { //No exite el curso
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
    const database = await conexionBD();
    const collection = database.collection("cursos");
    //indicar la instrucción MQL
    const result = await collection.deleteOne(
      { _id: new ObjectId(id)})
     console.log(result.deletedCount);
    
    if (result.deletedCount == 0) {
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