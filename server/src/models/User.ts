import type {Document} from "mongoose";
import mongoose from "mongoose"
const {Schema, model} = mongoose

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