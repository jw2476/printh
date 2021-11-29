import { auth } from './auth/index.js'
import {Router} from "express";
import { createGame } from './createGame.js';
import { game } from './game/index.js';

export const api = Router()

api.use("/auth", auth)
api.get("/createGame", createGame)
api.use("/game", game)

