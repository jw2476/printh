import express from "express"
import http from "http"
import bodyParser from 'body-parser';

import "$lib/db"
import { io } from '$lib/io';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from '../build/middlewares.js';
import api from "./api/index.js";


const app = express()
const server = http.createServer(app)
io.attach(server)

app.use(bodyParser.json())
app.use("/api", api)
app.use(assetsMiddleware, prerenderedMiddleware, kitMiddleware)


server.listen(8000, () => {
	console.log("Server is Running!")
})