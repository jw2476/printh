import { User } from '$lib/models/User';
import type {  EndpointOutput } from '@sveltejs/kit/types/endpoint';
import type { Request } from '$lib/Request';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

type LoginBody = {
	username: string,
	password: string
}

export async function post(req: Request<LoginBody>): Promise<EndpointOutput> {
	const {username, password} = req.body

	const user = await User.findOne({username, password})
	if (!user) {
		return {
			status: 404
		}
	}
	console.log("AAA")


	const token = jwt.sign(username, process.env["SECRET"])

	return {
		status: 200,
		body: {
			token
		}
	}
}