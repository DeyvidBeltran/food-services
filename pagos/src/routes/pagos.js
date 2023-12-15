const express = require("express")
const router = express.Router()
const {
  bdConnection,
  crearPago,
  actualizarPago,
} = require("../controllers/pagos")

bdConnection()

router.post("/crearPago", crearPago)
router.put("/actualizarPago", actualizarPago)

module.exports = router
