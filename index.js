var colors = require('colors/safe');
const app = require("./src/app");

const server = app.listen(app.get("port"), () => {
  console.log(colors.brightCyan("/----------------------------------------------------------------/"))
  console.log(colors.brightCyan("/----------------API-SENDING-MESSAGES-TO-WHATSAPP----------------/"))
  console.log(colors.brightCyan("/----------------------CREATED BY: JOSEPHSB----------------------/"))
  console.log(colors.brightCyan("/-------------------------CORE: VENOM-BOT------------------------/"))
  console.log(colors.brightCyan("/----------------------------------------------------------------/"))
  console.log(colors.brightWhite(`RUN SERVER ON PORT: ${app.get("port")}`));
});

const io = require('socket.io')(server)
global.socketEvents = {sendQR:() => {}};

io.on('connection', (socket) => {
    socket.on('newClient',(data)=>{
      console.log(colors.brightCyan("New client connected to websocket"))
    })
    const CHANNEL = 'main-channel';
    socket.join(CHANNEL);
    socketEvents = require('./src/websockets/socket')(socket)
})
