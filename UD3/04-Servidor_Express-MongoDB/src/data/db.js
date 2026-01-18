"use strict"

//importar el paquete mongoDB
import { MongoClient } from "mongodb";
import { URI } from '../config.js';

//crear la instancia del cliente mongoDB utilizando la URI de conexión
const client=new MongoClient(URI);
let conexion;

/**
 * Conecta a la base de datos de MongoDB de forma asíncrona.
 * @returns {Promise<Db>} Instancia de la base de datos
 */
export const conexionBD = async()=>{
    //conectar al servidor de forma asíncrona
    try {
        if(!conexion){
            conexion=await client.connect();
            console.log("Conexión exitosa a la base de datos MongoDB");
        }
        //conectar con la BD ciclostrassierra  
        return conexion.db("ciclostrassierra");  
    } catch (error) {
        console.log(error);
        console.error(`Error al conectar a la base de datos MongoDB: ${error.message}`);

        // Cerrar el cliente en caso de error
        await client.close();
        throw new Error("No se pudo conectar a la base de datos");
    }
}


