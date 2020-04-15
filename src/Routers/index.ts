import * as express from "express"
import Post from "./post/post.router"
import Comment from "./comment/comment.router"
const router = express.Router()
router.use("/post", Post)
router.use("/comment", Comment)
export default router
