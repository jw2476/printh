import { Router } from 'express';
import { generateCode } from './generateCode';
import { players } from './players';
import { startGame } from './startGame';

const router = Router()

router.get("/generateCode", generateCode)
router.get("/players", players)
router.get("/startGame", startGame)

export default router