import { Request, Response } from "express";

export function me(req: Request, res: Response) {
    res.json({username: res.locals.user.username, id: res.locals.user._id})
}