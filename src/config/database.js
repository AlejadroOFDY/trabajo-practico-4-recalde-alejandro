import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //dotenv sirve para las variables de entorno (.env) mantiendolas ocultas

dotenv.config(); // lee el archivo .env

const sequelize = new Sequelize(
  // process sirve para leer las variables de env como el nombre de la DB
  process.env.DB_NAME, // nombre que le puse a la DB
  process.env.DB_USER, // usuario
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST, // ip a la que se conecta nuestra DB
    dialect: process.env.DB_DIALECT, // establece el dialecto (tipo de DB)
  }
);

export default sequelize;
