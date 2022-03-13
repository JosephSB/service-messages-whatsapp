var colors = require('colors/safe');
const { isValidListOfNumbers, isValidMessage, isValidURL } = require('../helpers/validator');
const WhatsappController = () => {};

async function sendMessages(phoneNumbers, message){
    phoneNumbers.map(phone => {
        gclient.sendText(phone+'@c.us', message)
            .then((result) => {
                console.log(colors.brightGreen("Sending Message to: "+phone))
            })
            .catch((erro) => {
                console.log(colors.brightRed("I cant send the message to: "+phone));
            });
    })
}

async function sendImages(phoneNumbers, UrlImage, description){
    phoneNumbers.map(phone => {
        gclient.sendImage(phone+'@c.us',UrlImage,'ocucaje', description)
            .then((result) => {
                console.log(colors.brightGreen("Sending Image to: "+phone));
            })
            .catch((erro) => {
                console.log(colors.brightRed("I cant send the Image to: "+phone));
            });
    })
}

WhatsappController.sendMessage = (req,res) =>{

    if(Object.entries(req.body).length !== 2){
        return res.json({
            message: "No se enviaron los datos necesario",
            error: true
        })
    }

    const {phoneNumbers, textMessage} = req.body;

    if(
        !isValidListOfNumbers(phoneNumbers) ||
        !isValidMessage(textMessage)
    ){
        return res.json({
            message: "Los datos enviados no son correctos",
            error: true
        })
    }

    sendMessages(phoneNumbers,textMessage)

    return res.json({
        message: "El mensaje se envio correctamente",
        error: false
    })
}

WhatsappController.sendImage = (req,res) =>{

    if(Object.entries(req.body).length !== 3){
        return res.json({
            message: "No se enviaron los datos necesario",
            error: true
        })
    }

    const {phoneNumbers, UrlImage, Description} = req.body;

    if(
        !isValidListOfNumbers(phoneNumbers) ||
        !isValidURL(UrlImage) ||
        !isValidMessage(Description)
    ){
        return res.json({
            message: "Los datos enviados no son correctos",
            error: true
        })
    }

    sendImages(phoneNumbers, UrlImage, Description)
    return res.json({
        message: "La imagen se envio correctamente",
        error: false
    })
}


module.exports = WhatsappController;