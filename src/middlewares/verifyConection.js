
async function isConnected (req,res,next){
    if(gclient){
        let isConnectedToVenom = await gclient.isConnected();
        if(isConnectedToVenom){
            return next()
        }
    }
    res.json({
        message: "No tiene una cuenta de whatsapp enlasada al servicio",
        error: true
    })
}

module.exports = isConnected