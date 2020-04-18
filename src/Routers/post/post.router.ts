import * as express from "express"
import { Create, FindAll, FindOne, Delete } from "./post.controller"
const router = express.Router()

router.post("/create", Create)
router.post("/findall", FindAll)
router.post("/findone", FindOne)
router.delete("/delete", Delete)
export default router
