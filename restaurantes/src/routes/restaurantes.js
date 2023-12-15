const express = require("express")
const router = express.Router()
const {
  bdConnection,
  crearRestaurante,
  actualizarRestaurante,
} = require("../controllers/restaurantes")

bdConnection()

router.post("/crearRestaurante", crearRestaurante)
router.put("/actualizarRestaurante", actualizarRestaurante)

module.exports = router
