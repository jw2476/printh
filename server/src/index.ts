import express from 'express';
import { api } from './api/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as http from 'http';
import { Server } from 'socket.io';
import { Socket } from './io/Socket.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';

dotenv.config();

const {
	MONGO_URI,
	SECRET,
	PORT
} = process.env;

mongoose.connect(MONGO_URI).then(() => {
	console.log('Connected to DB!');
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', async (req, res, next) => {
	if (req.cookies['token']) {
		const _id = jwt.verify(req.cookies['token'], SECRET) as string;
		const user = await User.findOne({ _id });
		if (user) {
			res.locals.user = user;
		}
	}
	next();
});
app.use('/api', api);

io.on('connect', ws => {
	const socket = new Socket(ws);
});

server.listen(PORT, () => {
	console.log('Server is running');
});