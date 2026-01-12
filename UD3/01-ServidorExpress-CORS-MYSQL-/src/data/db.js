//conexión a la BD
import mysql from "mysql2/promise";

export const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database: 'ciclostrassierra',
    waitForConnections: true, //Espera conexiiones si todas están ocupadas.
    connectionLimit: 10, //Número de máximo de conexiones simultáneas en elpool
    queueLimit:0, //No tiene limite para la cola de solicitudes
    connectTimeout : 10000 //10 segundos de expera
})

const testConnection=async()=>{
    try {
         const connection = await pool.getConnection(); //estableciendo conexión con la BD
         console.log('Conexión con MYSQL establecida correctamente');
         //Liberar la conexión para que pueda ser reutilizada por otra petición
         connection.release();
    } catch (error) {
        console.log(`Error en la conexión con MySQL ${error.message}`);
    }
   
}

testConnection();
