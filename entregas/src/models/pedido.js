const { DataTypes } = require("sequelize")
const db = require("../config/sequelize")

const Pedido = db.define(
  "pedido",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
    },
    id_entregador: {
      type: DataTypes.INTEGER,
    },
    id_restaurante: {
      type: DataTypes.INTEGER,
    },
    id_pago: {
      type: DataTypes.INTEGER,
    },
    descripcion: {
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

module.exports = Pedido
