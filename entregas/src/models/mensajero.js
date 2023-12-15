const { DataTypes } = require("sequelize")
const db = require("../config/sequelize")

const Mensajero = db.define(
  "mensajero",
  {
    usuario: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
)

module.exports = Mensajero
