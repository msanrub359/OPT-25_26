"use strict"
//importar express
import express from "express";
const PORT = 3000;
//crear el servidor
const server = express();
//definir las rutas (endpoints)
server.get ("/", (req, res)=>{
  res.status(200).send("¡Hola mundo! Servidor de Node.js funcionando con nodemon");
});
server.get ("/about", (req, res)=>{
  res.status(200).send("Está en la página de About");
});
//otra ruta , pagina no encontrada(404)
server.use ((req, res)=>{
  res.status(404).send("Página no encontrada");
});
    
//iniciar el servidor y escuchar en el puerto establecido

server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})