import * as bcrypt from "bcrypt-nodejs"
import { Request, Response } from "express"
import Post from "../../Model/post"
import * as moment from "moment"
import Send from "../../Module/Send"
import * as jwt from "jsonwebtoken"

require("dotenv").config()

export const Create = async (req: Request, res: Response) => {
  const { username, password, title } = req.body
  if (!username || !password || !title) {
    return Send(res, 200, "빈칸을 모두 입력해 주세요.", false)
  }

  bcrypt.hash(password, null, null, async function (err, hash) {
    const post: any = new Post({
      title: title,
      time: moment().format("YYYY-MM-DD-HH-mm-ss"),
      username: username,
      password: hash,
    })
    await post
      .save()
      .then(data => {
        return res
          .status(200)
          .send({ state: true, result: "게시물을 정상적으로 작성하였습니다." })
          .end()
      })
      .catch(err => Send(res, 200, "DB 저장을 실패했습니다.", false))
  })
}
export const Init = async (req: Request, res: Response) => {
  Post.deleteMany({}, function (err) { })
}

export const FindAll = async (req: Request, res: Response) => {
  Post.find({}, function (err, result) {
    var r = result.reverse()
    return Send(res, 200, "성공", true, r)
  })
}
export const FindOne = async (req: Request, res: Response) => {
  const { _id } = req.body
  Post.findOne({ _id: _id }, function (err, result) {
    return Send(res, 200, "성공", true, result)
  })
}
