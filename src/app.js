const express = require("express");
const path = require("path");
const cors = require("cors");
const venom = require('venom-bot');
const {isConnected} = require("./middlewares/VenomBot.js");

global.isConnectedToVenom = false;
venom
    .create({
        session: 'ocucaje-wsp',
        multidevice: false
    })
    .then((client) => {
        global.gclient = client
        global.isConnectedToVenom = true;
    })
    .catch((erro) => {
        console.log("I can't connected to venom-bot", erro);
    });

const app = express();
const PublicDir = express.static(path.join(__dirname + "/public"));

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(PublicDir);

app.get("/", (req, res) => {
    res.send("WHATSAPP FLASH!");
});
app.use("/api/whatsapp",isConnected, require('./router/whatsapp.router.js'));

module.exports = app;