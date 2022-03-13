const express = require("express");
const path = require("path");
const cors = require("cors");
const venom = require('venom-bot');
const {isConnected} = require("./middlewares/VenomBot.js");

global.isConnectedToVenom = false;
venom
    .create(
        'ocucaje-wsp',
        (base64Qr, asciiQR, attempts, urlCode) => {
          console.log(asciiQR);
          var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
    
          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];
          response.data = new Buffer.from(matches[2], 'base64');
    
          var imageBuffer = response;
          require('fs').writeFile(
            './src/public/qr.png',
            imageBuffer['data'],
            'binary',
            function (err) {
              if (err != null) {
                console.log(err);
              }
            }
          );
        },
        undefined,
        { 
            logQR: false,
            autoClose: 0,
            browserArgs: [
                '--disable-web-security',
                '--no-sandbox',
                '--disable-web-security',
                '--aggressive-cache-discard',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disk-cache-size=0',
                '--disable-background-networking',
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--ignore-certificate-errors',
                '--ignore-ssl-errors',
                '--ignore-certificate-errors-spki-list',
            ],
        }
    )
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