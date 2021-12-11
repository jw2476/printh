import { Request, Response } from "express";

export function question(req: Request, res: Response) {
    res.json({
        question: "Test question",
        answers: ["Correct", "Incorrect", "Incorrect", "Correct"],
        correctAnswers: ["Correct"]
    })
}