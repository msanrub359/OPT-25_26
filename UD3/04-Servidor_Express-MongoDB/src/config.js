import {config} from 'dotenv'

config(); //leer las variables de entorno

export const PORT=process.env.PORT
export const URI=process.env.URI