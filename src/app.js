const express = require("express");
const path = require("path");
const cors = require("cors");
const isConnected = require('./middlewares/verifyConection')

global.gclient = false;

const app = express();
const PublicDir = express.static(path.join(__dirname + "/public"));
app.set('views', path.join(__dirname + '/pages/'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(PublicDir);

app.get("/", (req, res) => {
    res.send("WHATSAPP FLASH!");
});
app.get("/access/:account", (req,res) =>{
    const WhatsAppAcount = (req.params.account).toUpperCase()
    res.render("index.html",{
        account: WhatsAppAcount
    })
})
app.use("/api/connect",require('./router/conection.router.js'));
app.use("/api/whatsapp",isConnected, require('./router/whatsapp.router.js'));

module.exports = app;