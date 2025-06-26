import personajeDB from "../models/character.model.js";

export const todosLosPersonajes = async (req, res) => {
    try {
        const personajes = await personajeDB.findAll();
        res.status(200).json(personajes)
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener todos los personajes"})
    }
};

export const peronajePorID = async (req, res) => {
    
}