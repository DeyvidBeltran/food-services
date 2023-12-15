const express = require("express")
const router = express.Router()
const {
  crearPedido,
  bdConnection,
  consumeRabbit,
} = require("../controllers/pedidos")

bdConnection()
consumeRabbit()

router.post("/crear", crearPedido)

module.exports = router
