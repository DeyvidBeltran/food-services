const { DataTypes } = require("sequelize")
const db = require("../config/sequelize")

const Restaurante = db.define(
  "restaurante",
  {
    nombre: {
      type: DataTypes.STRING,
    },
    menu: {
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
)

module.exports = Restaurante
