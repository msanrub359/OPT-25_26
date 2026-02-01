import {config} from 'dotenv'

config(); //leer las variables de entorno

export const PORT=process.env.PORT
export const URI=process.env.URI
export const SECRET_KEY=process.env.SECRET_KEY
export const REFRESH_SECRET_KEY=process.env.REFRESH_SECRET_KEY
