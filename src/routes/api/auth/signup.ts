import { User } from '$lib/models/User';
import type {  EndpointOutput } from '@sveltejs/kit/types/endpoint';
import type { Request } from '$lib/Request';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

type SignUpBody = {
  username: string,
  password: string
}

export async function post(req: Request<SignUpBody>): Promise<EndpointOutput> {
  const {username, password} = req.body

  const existingUser = await User.findOne({username})
  if (existingUser) {
    return {
      status: 409
    }
  }

  await new User({
    username,
    password
  }).save()

  const token = jwt.sign(username, process.env["SECRET"])

  return {
    status: 200,
    body: {
      token
    }
  }
}