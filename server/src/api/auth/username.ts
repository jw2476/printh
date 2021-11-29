import { Request, Response } from "express";

export function username(req: Request, res: Response) {
    res.json({username: res.locals.user.username})
}