function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      if(bearerToken === process.env.AUTH_KEY){
        req.token = bearerToken;
        next();
      }else{
        res.json({
            message: "TOKEN INVALIDO",
            error: true,
        })
      }
    } else {
      res.sendStatus(403);
    }
}

module.exports = verifyToken;