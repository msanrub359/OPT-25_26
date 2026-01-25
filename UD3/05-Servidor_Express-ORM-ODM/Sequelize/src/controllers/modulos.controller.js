import { Modulo} from '../models/modulos.model.js';

/**
 * @function getModulos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getModulos = async (req, res) => {
 try {
    const {id} = req.params;
    const result = await Modulo.findByPk(id);
    if (result.length == 0) { //para mostrar datos en tabulator
      return res.status(200).json({ data: [] });
    }
    console.log(result);
    // Sequelize devuelve objetos, convertimos a JSON plano
    // res.status(200).json({
    //   data: result.map(modulo => modulo.toJSON())
    // });
    res.status(200).json({
      data: result
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener modulos", error: error.message });
  }
    
  
}