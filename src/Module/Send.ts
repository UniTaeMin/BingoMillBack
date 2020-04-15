function Send(res, status: number, result?: string, state?: boolean, data?: any) {
  res
    .status(status)
    .send({ result, state, data })
    .end()
}
export default Send
