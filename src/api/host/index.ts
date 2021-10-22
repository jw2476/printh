import { Router } from 'express';
import { generateCode } from './generateCode';

const router = Router()

router.get("/generateCode", generateCode)

export default router