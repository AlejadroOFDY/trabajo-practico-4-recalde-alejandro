import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Creando los objetos
const personajeDB = sequelize.define("Personaje", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true, // unique es para evitar duplicados
  },
  ki: { type: DataTypes.STRING, allowNull: false },
  race: { type: DataTypes.STRING, allowNull: false },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [["Male", "Female"]],
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // True porque esto es opcional, a diferencia de name, ki o race
  },
});

export default personajeDB;
