import express from "express"
import api from "./api/index.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config()

const {
    MONGO_URI
} = process.env

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!")
})

const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))
app.use("/api", api)

app.listen(8000, () => {
    console.log("Server is running")
})