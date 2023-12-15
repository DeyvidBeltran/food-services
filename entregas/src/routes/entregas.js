const express = require("express")
const router = express.Router()
const { bdConnection, asignarMensajero } = require("../controllers/entregas")

bdConnection()

router.put("/", asignarMensajero)

module.exports = router
