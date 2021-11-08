import auth from "./auth/index.js"
import {Router} from "express";

const router = Router()

router.use("/auth", auth)

export default auth