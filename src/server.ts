import express from 'express';
import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from '../build/middlewares.js';

const app = express();

app.use(assetsMiddleware, prerenderedMiddleware, kitMiddleware);

app.listen(8000, () => {
	console.log('Server running!');
});
