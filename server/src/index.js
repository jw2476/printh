import express from "express";
import api from "./api";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!");
});
const app = express();
app.use(express.static("public"));
app.use("/api", api);
app.listen(8000, () => {
    console.log("Server is running");
});
//# sourceMappingURL=index.js.map