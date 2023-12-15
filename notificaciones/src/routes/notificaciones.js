const express = require("express")
const router = express.Router()
const {
  enviarNotificaciones,
  bdConnection,
} = require("../controllers/notificaciones")

bdConnection()

router.get("/enviar", enviarNotificaciones)

module.exports = router
