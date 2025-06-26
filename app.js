import express from "express";
import rutaPersonajes from "./src/routes/character.routes.js";

const app = express();
const PORT = 3306;

// convierte la información en json
app.use(express.json());

// esto es simplemente qué queremos que pase cuando esa ruta suceda
app.use("/api/characters", rutaPersonajes);

// típico mensaje de que el servidor está funcionando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
