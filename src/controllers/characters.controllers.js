import Characters from "../models/character.model.js";

export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Characters.findAll();
        res.status(200).json(characters)
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener todos los personajes"})
    }
};

export const getCharacterById = async (req, res) => {
    try {
        const character = Characters.findByPk(req.params.id);
        // No olvidar que ! es el operador de NEGACIÓN
        if (!character) {
            return res.status(404).json({error: "Personaje no encontrado"});
        }
    } catch {

    }
};

export const createCharacter = async (req, res) => {
    try {
        const {name, ki, race, gender, description } = req.body; //req.body es la info enviada por el usuario

        // Acá van a ir las validaciones
        if (!name || !ki || !race || !gender) {
            res.status(400).json({ error: "Faltan campos obligatorios"});
        }
        if (isNaN(ki)) {
            res.status(400).json({ error: "El ki debe ser un número entero"});
        }
        if (gender !== "Male" && gender !== "Female") {
            res.status(400).json({ error: "El género solo puede ser Male o Female" });
        }
        const newCharacter = await Characters.create({
        name,
        ki: parseInt,
        race,
        gender,
        description,
    });
    res.status(200).json(newCharacter)
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "El nombre ya está en uso"});
        } else {
            res.status(500).json({ error: "Error al crear el personaje"});
        }
    }
};

export const updateCharacter = async (req, res) => {
    
}