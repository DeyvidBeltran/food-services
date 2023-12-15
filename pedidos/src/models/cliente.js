const { DataTypes } = require("sequelize")
const db = require("../config/sequelize")

const Cliente = db.define(
  "cliente",
  {
    usuario: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    correo: {
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

module.exports = Cliente
