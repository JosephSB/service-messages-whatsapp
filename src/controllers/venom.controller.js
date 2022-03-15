var colors = require('colors/safe');
const { getTime } = require('../helpers/time');
const VenomController = () => {};

VenomController.sendMessages = async (phoneNumbers, message) => {
    let phoneNotSend = [];
    await phoneNumbers.map((phone) => {
        gclient.sendText(phone+'@c.us', message)
            .then((result) => {
                console.log(colors.brightGreen(`[${getTime()}]: Sending message to: ${phone}`))
            })
            .catch((erro) => {
                phoneNotSend.push(phone);
                console.log(colors.brightRed(`[${getTime()}]: Cant send the message to: ${phone}`));
            });
    })
    
    return new Promise((resolve, reject) => {
        if(phoneNotSend.length !== 0) reject(phoneNotSend)
        else resolve(phoneNotSend)
    })

}

VenomController.sendImages = async (phoneNumbers, UrlImage, description) => {
    let phoneNotSend = [];
    await phoneNumbers.map((phone) => {
        gclient.sendImage(phone+'@c.us',UrlImage,'ocucaje', description)
            .then((result) => {
                console.log(colors.brightGreen(`[${getTime()}]: Sending image to: ${phone}`));
            })
            .catch((erro) => {
                phoneNotSend.push(phone);
                console.log(colors.brightRed(`[${getTime()}]: Cant send the image to: ${phone}`));
            });
    })

    return new Promise((resolve, reject) => {
        if(phoneNotSend.length !== 0) reject(phoneNotSend)
        else resolve(phoneNotSend)
    })
}

module.exports = VenomController;