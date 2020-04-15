import * as bcrypt from "bcrypt-nodejs"
import { Request, Response } from "express"
import Comment from "../../Model/comment"

import * as moment from "moment"
import Send from "../../Module/Send"
import * as jwt from "jsonwebtoken"

require("dotenv").config()

export const Create = async (req: Request, res: Response) => {
  const { post_id, text, token } = req.body
  if (!token) {
    return Send(res, 200, "로그인을 해주세요.", false)
  }
  if (!text) {
    return Send(res, 200, "댓글을 입력해 주세요.", false)
  }
  if (text.length > 40) {
    return Send(res, 200, "댓글은 40자 이내로 작성해주세요.", false)
  }
  let decoded = jwt.verify(token, process.env.jwtpassword)

  const comment: any = new Comment({
    post_id: post_id,
    text: text,
    time: moment().format("YYYY-MM-DD-HH-mm-ss"),
    username: '이부분 고쳐야됨'
  })
  await comment
    .save()
    .then(data => {
      return res
        .status(200)
        .send({ state: true, result: "댓글을 정상적으로 등록하였습니다." })
        .end()
    })
    .catch(err => Send(res, 200, "DB 저장을 실패했습니다.", false))

}
export const Find = async (req: Request, res: Response) => {
  const { post_id } = req.body
  Comment.find({ post_id: post_id }, function (err, result) {
    var r = result.reverse()
    return Send(res, 200, "성공", true, r)
  })
}
export const Init = async (req: Request, res: Response) => {
  Comment.deleteMany({}, function (err) { })
}
