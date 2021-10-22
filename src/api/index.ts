import { NextFunction, Request, Response, Router } from 'express';
import auth from './auth';
import host from './host';
import jwt from 'jsonwebtoken';
import { User } from '$lib/models/User';
import dotenv from 'dotenv';
import { joinGame } from './joinGame';

dotenv.config();

const router = Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
	const token: string | null = req.get('Authorization');

	if (token) {
		const _id = jwt.verify(token, process.env['SECRET']) as string;
		res.locals.user = await User.findOne({ _id });
	}

	next();
});

router.use('/auth', auth);
router.use('/host', host);
router.get('/joinGame', joinGame)

export default router;