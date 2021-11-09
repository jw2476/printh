import { auth } from './auth/index.js'
import {Router} from "express";
import { createGame } from './createGame.js';

export const api = Router()

api.use("/auth", auth)
api.get("/createGame", createGame)

