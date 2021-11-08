import { Router } from 'express';
import { login } from './login.js';
import { signup } from './signup.js';

const router = Router()

router.post("/login", login)
router.post("/signup", signup)

export default router