const venom = require('venom-bot');
const connectionController = () => {};

connectionController.Connect = (req,res) =>{
    let accountWhatsapp = req.params.accountWhatsapp;
    venom
    .create(
        accountWhatsapp,
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
          if(socketEvents) socketEvents.sendQR(imageBuffer['data'])
          else console.log("El websocket no esta activado");
          require('fs').writeFile(
            "qr.png",
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
            // CONFIG local
            //logQR: false,
            //EXTRAS
            //autoClose: 0,
            //headless: false,
            //browserArgs: chromiumArgs,
            // CONFIG PROD
            
            puppeteerOptions: { args: ['--no-sandbox'] },
            useChrome: false, 
            browserArgs: ['--no-sandbox']
        }
    )
    .then((client) => {
        gclient = client;
        console.log("Connected to venom-bot");
        res.json({
            message: "Conexion exitosa",
            error: false
        })
    })
    .catch((erro) => {
        console.log("Can't connected to venom-bot", erro);
        res.json({
            message: "Can't connected to venom-bot",
            error: false
        })
    });
}

connectionController.isConnect = async (req,res) =>{
  if(gclient){
    let isConnectedToVenom = await gclient.isConnected();
    if(isConnectedToVenom){
      res.json({
        message: "Usted esta conectado al servicio",
        error: false
      })
    }
  }
  res.json({
      message: "No tiene una cuenta de whatsapp enlasada al servicio",
      error: true
  })
}

module.exports = connectionController