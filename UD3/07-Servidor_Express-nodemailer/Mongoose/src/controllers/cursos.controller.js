import { Curso } from '../models/cursos.model.js';
/**
 * @function getCursos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getCursos = async (req, res) => {
  try {

    const cursos = await Curso.find()
        .sort({ descripcion: 1 }); //orden ascendente -1 descendente

    res.status(200).json({ data: cursos.length ? cursos : [] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener cursos", error: error.message });
  }
}

export const getCurso = async (req, res) => {
  try {
    const {id} =req.params
    console.log('pasa');
    const curso = await Curso.findById(id)
    
    if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

    res.status(200).json({ data: curso });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener cursos", error: error.message });
  }
};

export const addCurso = async (req, res) => {
  try {

    const { descripcion, idCurso } = req.body;
    console.log(descripcion);
    //comprobar que el nombre del curso no existe
    const existeCurso = await Curso.findOne({idCurso})
    if (existeCurso){
         return res.status(400).json({ message: `El curso "${idCurso}" ya existe` });
    }

    const nuevocurso = await Curso.create({descripcion, idCurso});
    

    res.status(201).json({ id: nuevocurso._id });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el curso", error: error.message }
    )

  };
}

export const updateCurso = async (req, res) => {
  try {

    const { descripcion, idCurso } = req.body;
    const { id } = req.params;

    //comprobar que el idCurso no existe
    const cursoExiste=await Curso.findOne({idCurso});

   if (!cursoExiste) {
      return res.status(400).json({ message: `El curso "${idCurso}" ya existe` });
    }
    const curso = await Curso.findOneAndUpdate(
      { _id: id }, //filtro
      { descripcion, idCurso }, //datos a actualizar
      { new: true, runValidators: true });//devolver documento actualizado y aplica validaciones.
    

    if (!curso) return res.status(404).json({ message: 'curso no existe' });

    res.status(200).json({ message: `curso actualizado ${curso._id}  `});


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
    const curso = await Curso.findByIdAndDelete(id);

    if (!curso) return res.status(404).json({ message: 'curso no existe' });

    res.status(200).json({ message: 'curso borrado' });
  } catch (error) {
    res.status(500).json(
      { message: "Error al borrar el curso", error: error.message }
    )
  }
};

