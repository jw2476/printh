import { Router } from "express"
import { players } from "./players.js"

export const game = Router()

game.get("/players", players)