import { Request, Response } from "express";
import { Game } from "../../models/Game.js";

export async function players(req: Request, res: Response) {
    const user = res.locals.user
    const game = await Game.findOne({players: user._id}).populate("players")

    res.json(game.players.filter(player => player.username !== user.username).map(player => player.username))
}