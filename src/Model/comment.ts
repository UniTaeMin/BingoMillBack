import { model, Schema, Model, Document } from "mongoose"
const commentSchema = new Schema({
  post_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
export interface CommentDocument extends Document {
  post_id: string
  username: string
  text: string
  time: string
}
const Comment: Model<CommentDocument> = model("comment", commentSchema)
export default Comment
