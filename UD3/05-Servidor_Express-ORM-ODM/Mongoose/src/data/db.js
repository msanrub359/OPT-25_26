import mongoose from "mongoose";
import { URI } from "../config.js";

let conexion = null;

/**
 * Conecta a la base de datos de MongoDB usando Mongoose.
 * Devuelve la instancia de conexión.
 * La conexión se hace una sola vez y se reutiliza.
 */
export const conexionBD = async () => {
  try {
    if (conexion && mongoose.connection.readyState === 1) {
      console.log("Ya existe una conexión activa a MongoDB");
      return conexion;
    }

    // Conectar a la DB ciclostrassierra especificada en la URI
    conexion = await mongoose.connect(URI, {
      dbName: "ciclostrassierra",       // IMPORTANTE: asegura la DB
      serverSelectionTimeoutMS: 30000   // 30 segundos de timeout
    });

    console.log("Conexión exitosa a MongoDB con Mongoose");
    return conexion.connection;

  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
    throw new Error("No se pudo conectar a la base de datos");
  }
};
