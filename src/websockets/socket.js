
module.exports = (socket) => {
    return {
        sendQR:(qr) => {
            socket.emit('connection_qr',{
                qr
            })
        }
    }

}