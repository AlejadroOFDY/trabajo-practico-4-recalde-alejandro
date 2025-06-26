import { Router } from "express";
import {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,

} from "../routes/character.controllers.js";

const router = Router();

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.get("/", createCharacter);
router.get("/:id", updateCharacter);
router.get("/:id", deleteCharacter);

export default router;