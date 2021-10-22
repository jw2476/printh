import type {Document} from "mongoose";
import {Schema, model} from "mongoose"
import "$lib/db"

type IUserBase = {
  username: string,
  password: string
}
export type IUser = IUserBase & Document

const userSchema = new Schema({
  username: String,
  password: String
})

export const User = model<IUser>("User", userSchema)