import express from "express"
import api from "./api/index.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as http from 'http';
import {Server} from "socket.io"
import { Socket } from './io/Socket.js';
import cookieParser from "cookie-parser"

dotenv.config()

const {
    MONGO_URI
} = process.env

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!")
})

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static("public"))
app.use("/api", api)

io.on('connect', ws => {
    const socket = new Socket(ws)
})

server.listen(8000, () => {
    console.log("Server is running")
})