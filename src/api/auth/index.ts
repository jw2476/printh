import { Router } from 'express';
import { login } from './login';
import { signup } from './signup';

const router = Router()

router.post("/login", login)
router.post("/signup", signup)

export default router