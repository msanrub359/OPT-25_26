"use strict"
//importar express
import express from "express";
import {config} from "dotenv";

config();
const PORT = process.env.PORT || 3000;
console.log(PORT);
//crear el servidor
const server = express();

//configurar donde se encuentran las vistas
server.set("view engine", "ejs"); //se le indica a express que se usarán la plantilla de ejs
server.set("views", "./src/views"); //se le indica a express donde buscar las plantillas

//definir las rutas (endpoints)
server.get ("/", (req, res)=>{
  res.status(200).send("¡Hola mundo! Servidor de Node.js funcionando con nodemon");
});
server.get ("/about", (req, res)=>{
  // res.status(200).send("Está en la página de About");
  res.render("inicio", {titulo: 'Página de inicio', nombre:'Sofía Contreras'})
});
//otra ruta , pagina no encontrada(404)
server.use ((req, res)=>{
  res.status(404).send("Página no encontrada");
});
    
//iniciar el servidor y escuchar en el puerto establecido

server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})