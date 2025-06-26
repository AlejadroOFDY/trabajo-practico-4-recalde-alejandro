import Characters from "../models/character.model.js";

// Acá va a ir lo del CRUD (Create, Read, Update, Delete)

 // Obtener los personajes
export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Characters.findAll();
        res.status(200).json(characters)
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener todos los personajes"})
    }
};

// Obtener 1 personaje
export const getCharacterById = async (req, res) => {
    try {
        const character = Characters.findByPk(req.params.id);
        // No olvidar que ! es el operador de NEGACIÓN
        // Validación
        if (!character) {
            return res.status(404).json({error: "Personaje no encontrado"});
        }
        res.status(200).json(character)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el personaje"})
    }
};

// Crear pjes
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
        ki: parseInt(ki),
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

// Modificar un pje
export const updateCharacter = async (req, res) => {
    try {
        const character = Characters.findByPk(req.params.id);
        // Validaciones
        if (!character) {
            return res.status(404).json({ error: "No se encontró el personaje"});
        }

        const { name, ki, race, gender, description } = req.body;

        if (name && (await Characters.findOne({ where: { name } }))) {
            return res.status(400).json({error: "El nombre ya está en uso"});
        }
        if (ki && isNaN(ki)) {
            res.status(400).json({ error: "El ki debe ser un número entero"})
        }
        if (gender !== "Male" && gender !== "Female") {
            res.status(400).json({ error: "El género solo puede ser Male o Female"});
        }
        await character.update({
            name: name || character.name,
            ki: ki ? parseInt(ki) : character.ki,
            race: race || character.race,
            gender: gender || character.gender,
            description: description || character.description,
        });
        res.status(200).json(character);
    } catch {error} {
        res.status(500).json({ error: "Error al actualizar el personaje"});
    }
};

// Eliminar pjes
export const deleteCharacter = async (req, res) => {
    try {
        const character = await Characters.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ error: "No se encontró el personaje"});
        }
        await character.destroy();
        res.status(200).json({message: "Se eliminó el personaje exitosamente"});
    } catch (error) {
        res.status(500).json({error: "No se pudo eliminar el personaje"})
    }
};