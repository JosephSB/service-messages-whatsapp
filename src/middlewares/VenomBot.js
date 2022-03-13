
const venomController = () => {};

venomController.isConnected = (req,res,next) => {
    if(isConnectedToVenom){
        next()
    }
    res.json({
        message: "No tiene una cuenta de whatsapp enlasada al servicio",
        error: true
    })
}
module.exports = venomController