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
        (statusSession, session) => {
            console.log('Status Session: ', statusSession); 
            console.log('Session name: ', session);
        },
        { 
            logQR: false,
            autoClose: 0,
            browserArgs: [
                '--no-zygote',
                '--log-level=3',
                '--disable-site-isolation-trials',
                '--no-experiments',
                '--ignore-gpu-blacklist',
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
                '--disable-gpu',
                '--disable-extensions',
                '--disable-default-apps',
                '--enable-features=NetworkService',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--disable-webgl',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--disable-threaded-animation',
                '--disable-threaded-scrolling',
                '--disable-in-process-stack-traces',
                '--disable-histogram-customizer',
                '--disable-gl-extensions',
                '--disable-composited-antialiasing',
                '--disable-canvas-aa',
                '--disable-3d-apis',
                '--disable-accelerated-2d-canvas',
                '--disable-accelerated-jpeg-decoding',
                '--disable-accelerated-mjpeg-decode',
                '--disable-app-list-dismiss-on-blur',
                '--disable-accelerated-video-decode',
                '--disable-dev-shm-usage',
                '--disable-gl-drawing-for-tests',
                '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
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