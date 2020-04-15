function socket(io) {
  io.sockets.on("connection", socket => {
    console.log("연결완료")
    socket.on("SendServer", function(data) {
      io.sockets.emit("sendClient", data)
      console.log(data)
    })
  })
}
export default socket
