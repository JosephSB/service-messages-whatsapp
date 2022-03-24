const express = require("express");
const { Connect, isConnect } = require("../controllers/connection.controller");
const router = express.Router();

router.get("/:accountWhatsapp", Connect);
router.get("/isConnect", isConnect);

module.exports = router;