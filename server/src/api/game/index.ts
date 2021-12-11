import { Router } from "express"
import { question } from "./question.js"

export const game = Router()

game.get("/question", question)

