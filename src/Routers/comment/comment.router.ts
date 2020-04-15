import * as express from "express"
import { Create, Find, Init } from "./comment.controller"
import { Request, Response } from "express"

const router = express.Router()

router.post("/create", Create)
router.post("/find", Find)
router.get("/init", Init)
export default router
