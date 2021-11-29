import { Router } from 'express';
import { login } from './login.js';
import { signup } from './signup.js';
import { username } from './username.js';

export const auth = Router()

auth.post("/login", login)
auth.post("/signup", signup)
auth.get("/username", username)
