const db = require("../config/sequelize")
const ampq = require("amqplib")
const Mensajero = require("../models/mensajero")
const Pedidos = require("../models/pedido")

const rabbitSettings = {
  protocol: "amqp",
  hostname: "rabbitmq",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanismo: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
}

const asignarMensajero = async (req, res) => {
  try {
    const { body } = req

    //verificar que el mensajero exista
    const mensajeroId = body.id_mensajero

    const mensajero = await Mensajero.findOne({
      where: {
        id: mensajeroId,
      },
    })

    if (!mensajero) {
      return res.status(400).send({ error: "El mensajero no existe." })
    }

    // Publicar en colas
    connectRabbit(body)

    res.send({ data: `Se esta asignando el mensajero al pedido.` })
  } catch (error) {
    res.status(500)
    res.send({ error: `Algo ocurrio: ${error}` })
  }
}

const bdConnection = async () => {
  try {
    await db.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

async function connectRabbit(body) {
  const queue = "updated"

  const message = {
    message: "Entrega creada exitosamente",
    data: body,
    process: "entregas",
  }

  try {
    const ampqConnect = await ampq.connect(rabbitSettings)
    console.log("Connection created with Rabbit...")

    const channel = await ampqConnect.createChannel()
    console.log("Channel created.")

    const res = await channel.assertQueue(queue)
    console.log("Queue created.")

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    console.log(`Message send to queue ${queue}`)
  } catch (error) {
    console.log(`Error en Rabbit: ${error}`)
  }
}

module.exports = { asignarMensajero, bdConnection }
