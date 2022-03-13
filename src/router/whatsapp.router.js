const express = require("express");
const { sendMessage, sendImage } = require("../controllers/whatsapp.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/send-message",verifyToken, sendMessage);
//router.post("/send-template",verifyToken, /*UsersControllers.signin*/);
router.post("/send-image",verifyToken, sendImage);

module.exports = router;