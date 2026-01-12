"use strict"
//importar el módulo HTTP de node.js
import http from "http";
const PORT = 3000;
//crear el servidor
const server = http.createServer((req, res)=>{
    //verificar la ruta
    if (req.url==="/"){//está vacia
        res.statusCode=200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("¡Hola mundo! Servidor de Node.js funcionando con nodemon");
        
    }else if (req.url === "/about") {
        res.statusCode=200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Está en la página de About");
    }else{
        res.statusCode=404;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Página no encontrada");
    }

});

//iniciar el servidor y escuchar en el puerto establecido

server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})