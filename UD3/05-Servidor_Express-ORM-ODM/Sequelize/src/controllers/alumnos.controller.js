import { Alumno } from '../models/alumnos.model.js';
import { Curso } from '../models/cursos.model.js';

/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getAlumnos = async (req, res) => {
  try {
   
    const result = await Alumno.findAll();
    if (result.length == 0) { //para mostrar datos en tabulator
      return res.status(200).json({ data: [] });
    }
    console.log(result);
    // Sequelize devuelve objetos, convertimos a JSON plano
    res.status(200).json({
      data: result.map(alumno => alumno.toJSON())
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
}

export const getAlumno = async (req, res) => {
  try {

    const { id } = req.params
    const result = await Alumno.findByPk(id); //buscar por clave primaria
   
    res.status(200).json({ data: result.toJSON() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const getAlumnoCurso = async (req, res) => {
  try {

    const { idCurso } = req.params
    const result = await Alumno.findAll({
      where: { idCurso }

    });
    // Para mostrar datos en tabulator
    if (result.length === 0) {
      return res.status(200).json({ data: [] });
    }

   
    res.status(200).json({
      data: result.map(alumno => alumno.toJSON())
    });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener alumnos", error: error.message });
  }
};

export const addAlumno = async (req, res) => {
  try {

    const { nameAl, idCurso } = req.body;

    // 1. VERIFICAR QUE EL CURSO EXISTE (aprovechando la relación)
    const cursoExiste = await Curso.findByPk(idCurso);
    
    if (!cursoExiste) {
      return res.status(400).json({
        message: `El curso con ID "${idCurso}" no existe`
      });
    }

    const nuevoAlumno = await Alumno.create({
      apellidosNombre: nameAl,
      idCurso: idCurso
    });

    res.status(201).json({id: nuevoAlumno.idAlumno });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'Curso inválido' });
    }
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

    // 1. VERIFICAR QUE EL ALUMNO EXISTE 
    const alumnoExiste = await Alumno.findByPk(id);

    // Si no existe el alumno
    if (!alumnoExiste) {
      return res.status(400).json({
        message: 'El alumno no existe'
      });
    }

     // 2. VERIFICAR QUE EL CURSO EXISTE
    const cursoExiste = await Curso.findByPk(idCurso);
    
    if (!cursoExiste) {
      return res.status(400).json({
        message: `El curso con ID "${idCurso}" no existe`
      });
    }
    // Actualizar el alumno
    await alumnoExiste.update({
      apellidosNombre: nameAl,
      idCurso: idCurso
    });

    res.status(200).json({
      message: 'El alumno ha sido actualizado',
      data: alumnoExiste.toJSON()
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'Curso inválido' });
    }
    res.status(500).json(
      { message: "Error al actualizar el alumno", error: error.message }
    )
  }

}

export const updatePatchAlumno = async (req, res) => {
  try {
   
    const { nameAl, idCurso } = req.body;
    const { id } = req.params;

    const alumnoExiste = await Alumno.findByPk(id);

    // Si no existe el alumno
    if (!alumnoExiste) {
      return res.status(400).json({
        message: 'El alumno no existe'
      });
    }
    // Construir objeto con solo los campos que vienen en el body
    const camposActualizar = {};
    if (nameAl !== undefined) {
      camposActualizar.apellidosNombre = nameAl;
    }
    if (idCurso !== undefined) {
      camposActualizar.idCurso = idCurso;
    }
    // Actualizar solo los campos proporcionados
    await alumnoExiste.update(camposActualizar);

    console.log('Alumno actualizado:', alumnoExiste);

    res.status(200).json({
      message: 'El alumno ha sido actualizado'
      
    });

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
    const result = await Alumno.destroy({
      where: {idAlumno:id}
    })

    if (!result) {
      return res.status(404).json({
        message: 'El alumno no existe'
      });
    }
    res.status(200).json({message:`El alumno con id ${id} ha sido borrado`});

    } catch (error) {
    res.status(500).json(
      { message: "Error al borrar el alumno", error: error.message }
    )
  }
};

// Categoría	    Método	        Uso             	    Ejemplo
//---------------------------------------------------------------------
// Crear	      create()	      Inserta un registro	      Alumno.create(data)
//             	bulkCreate()	  Inserta varios	          Alumno.bulkCreate(lista)
// 	            build().save()	Construir y guardar	      Alumno.build(d).save()
// Leer       	findAll()	      Obtener todos	            Alumno.findAll()
// 	            findOne()	      Obtener uno	              Alumno.findOne({ where })
// 	            findByPk()	    Por clave primaria	      Alumno.findByPk(id)
// 	            findAndCountAll()	Lista + total	          Alumno.findAndCountAll()
// 	            findOrCreate()	Buscar o crear	          Alumno.findOrCreate()
// Actualizar	  update()	      Actualiza por condición	  Alumno.update(d,{ where })
// 	            increment()	    Incrementos	              Alumno.increment()
// Eliminar	    destroy()	      Borra	                    Alumno.destroy({ where })
// 	            truncate()	    Vacía tabla	              Alumno.truncate()
// Filtros	    where	          Condiciones	              { where:{ id:1 }}
// 	            Op.like	        Búsqueda	                { [Op.like]:'%Ana%' }
// 	            Op.gt	          Mayor que	                { [Op.gt]:18 }
// 	            Op.in	          En lista	                { [Op.in]:[1,2] }
// Relaciones	  include	        Join	                    include:[Curso]
// 	            getX()	        Obtener relacionados	    curso.getAlumnos()
// 	            addX()	        Asociar	curso.addAlumno()