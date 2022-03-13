var colors = require('colors/safe');
const app = require("./src/app");

app.listen(app.get("port"), () => {
  console.log(colors.brightCyan("/----------------------------------------------------------------/"))
  console.log(colors.brightCyan("/----------------API-SENDING-MESSAGES-TO-WHATSAPP----------------/"))
  console.log(colors.brightCyan("/----------------------CREATED BY: JOSEPHSB----------------------/"))
  console.log(colors.brightCyan("/-------------------------CORE: VENOM-BOT------------------------/"))
  console.log(colors.brightCyan("/----------------------------------------------------------------/"))
  console.log(colors.brightWhite(`RUN SERVER ON PORT: ${app.get("port")}`));
});
