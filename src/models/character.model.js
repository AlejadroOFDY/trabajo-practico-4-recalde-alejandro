import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Creando los objetos
const personaje = sequelize.define("Personaje", {
  name: {},
});
