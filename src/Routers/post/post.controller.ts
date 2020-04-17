import * as bcrypt from "bcrypt-nodejs"
import { Request, Response } from "express"
import Post from "../../Model/post"
import * as moment from "moment"
import Send from "../../Module/Send"
import * as jwt from "jsonwebtoken"

require("dotenv").config()

export const Create = async (req: Request, res: Response) => {
  const { wordSize, words, username, password, title } = req.body
  if (!username || !password || !title) {
    return Send(res, 200, "빈칸을 모두 입력해 주세요.", false)
  }

  bcrypt.hash(password, null, null, async function (err, hash) {
    const post: any = new Post({
      title: title,
      time: moment().format("YYYY-MM-DD"),
      username: username,
      password: hash,
      words: words,
      wordSize: wordSize,
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
    let r = [];
    result.forEach((e) => {
      let day = new Date(e.time)
      let goDay = day.getFullYear() + '년 ' + (day.getMonth() + 1) + '월 ' + day.getDate() + '일 '
      r.push({ title: e.title, time: goDay, username: e.username, words: e.words, wordSize: e.wordSize, _id: e._id })
    })
    return Send(res, 200, "성공", true, r)
  })
}
export const FindOne = async (req: Request, res: Response) => {
  const { _id } = req.body
  console.log(_id)
  Post.findOne({ _id: _id }, function (err, result) {
    if (result) {
      console.log(result)
      let day = new Date(result.time)
      let goDay = day.getFullYear() + '년 ' + (day.getMonth() + 1) + '월 ' + day.getDate() + '일 '
      let r = [{ title: result.title, time: goDay, username: result.username, words: result.words, wordSize: result.wordSize, _id: result._id }];
      return Send(res, 200, "성공", true, r)
    } else {
      return Send(res, 200, "실패", false, '실패')
    }

  })
}
