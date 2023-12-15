const db = require("../config/sequelize")
const ampq = require("amqplib")
const Pedido = require("../models/pedido")
const Pago = require("../models/pago")

const rabbitSettings = {
  protocol: "amqp",
  hostname: "rabbitmq",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanismo: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
}

const crearPago = async (req, res) => {
  try {
    const { body } = req

    //verificar que el pedido exista
    const pedidoId = body.id_pedido
    const payload_queue = {
      id_pedido: pedidoId,
      id_pago: body.id,
    }

    const pedido = await Pedido.findOne({
      where: {
        id: pedidoId,
      },
    })

    if (!pedido) {
      return res.status(400).send({ error: "El pedido no existe." })
    }

    //crear el pago
    const pago = await Pago.create(body)

    // Publicar en colas
    publishRabbit(payload_queue)

    res.send({ data: `Se esta transfiriendo el pago del pedido.` })
  } catch (error) {
    res.status(500)
    res.send({ error: `Algo ocurrio: ${error}` })
  }
}

const actualizarPago = async (req, res) => {
  try {
    const { body } = req

    //actualizar el pago
    const id_pedido = body.id
    delete body.id
    const pago = await Pago.update(body, {
      where: {
        id: id_pedido,
      },
    })

    res.send({ data: "Se actualizo el pago del pedido." })
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

async function publishRabbit(body) {
  const queue = "updated"

  const message = {
    message: "Pago realizado exitosamente",
    data: body,
    process: "pagos",
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

module.exports = { crearPago, actualizarPago, bdConnection }
