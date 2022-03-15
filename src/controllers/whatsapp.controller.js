var colors = require('colors/safe');
const { getTime } = require('../helpers/time');
const { isValidListOfNumbers, isValidMessage, isValidURL } = require('../helpers/validator');
const { sendMessages, sendImages } = require('./venom.controller');

const WhatsappController = () => {};


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
    
    let TimeRecived = getTime();
    console.log(colors.brightYellow("-----------------------------------------------"))
    console.log(colors.brightYellow(`[${TimeRecived}]: New Request to send messages`))
    console.log(colors.brightYellow("-----------------------------------------------"))

    sendMessages(phoneNumbers,textMessage)
        .then( (phonesNotShipped) =>{
            return res.json({
                message: "El mensaje se envio correctamente",
                phonesNotShipped,
                reception: TimeRecived,
                finished: getTime(),
                error: false
            })
        })
        .catch( (phonesNotShipped)=>{
            return res.json({
                message: "No se pudo enviar el mensaje a todos los numeros",
                phonesNotShipped,
                reception: TimeRecived,
                finished: getTime(),
                error: false
            })
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

    let TimeRecived = getTime();
    console.log(colors.brightYellow("-----------------------------------------------"))
    console.log(colors.brightYellow(`[${TimeRecived}]: New Request to send images`))
    console.log(colors.brightYellow("-----------------------------------------------"))

    sendImages(phoneNumbers, UrlImage, Description)
        .then( (phonesNotShipped) =>{
            return res.json({
                message: "El imagen se envio correctamente",
                phonesNotShipped,
                reception: TimeRecived,
                finished: getTime(),
                error: false
            })
        })
        .catch( (phonesNotShipped)=>{
            return res.json({
                message: "No se pudo enviar la imagen a todos los numeros",
                phonesNotShipped,
                reception: TimeRecived,
                finished: getTime(),
                error: false
            })
        })

}


module.exports = WhatsappController;