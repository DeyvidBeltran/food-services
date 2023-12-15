const { DataTypes } = require("sequelize")
const db = require("../config/sequelize")

const Pago = db.define(
  "pago",
  {
    id_pedido: {
      type: DataTypes.INTEGER,
    },
    valor: {
      type: DataTypes.INTEGER,
    },
    metodo: {
      type: DataTypes.STRING,
    },
  },
  {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
)

module.exports = Pago
