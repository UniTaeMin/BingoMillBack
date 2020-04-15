import { model, Schema, Model, Document } from "mongoose"
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  words: {
    type: Array,
    required: true
  },
  wordSize: {
    type: Number,
    required: true
  },
})
export interface PostDocument extends Document {
  title: string
  password: string
  time: string
  username: string
  words: [string]
  wordSize: number
}
const Post: Model<PostDocument> = model("post", postSchema)
export default Post
