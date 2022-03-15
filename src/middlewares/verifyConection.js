
function isConnected (req,res,next){
    if(isConnectedToVenom){
        next()
    }else{
        res.json({
            message: "No tiene una cuenta de whatsapp enlasada al servicio",
            error: true
        })
    }
}

module.exports = isConnected