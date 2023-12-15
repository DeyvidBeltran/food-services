const { Sequelize } = require("sequelize")

const db = new Sequelize("postgres", "admin", "password", {
  host: "postgresdb",
  dialect: "postgres",
})

module.exports = db
