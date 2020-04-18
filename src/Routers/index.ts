import * as express from "express"
import Post from "./post/post.router"
const router = express.Router()
router.use("/post", Post)
export default router
