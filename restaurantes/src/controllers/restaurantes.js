const db = require("../config/sequelize")
const ampq = require("amqplib")
const Restaurante = require("../models/restaurante")

const rabbitSettings = {
  protocol: "amqp",
  hostname: "rabbitmq",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanismo: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
}

const crearRestaurante = async (req, res) => {
  try {
    const { body } = req

    //crear el restaurante
    const restaurante = await Restaurante.create(body)

    res.send({ data: `Se creo el restaurante: ${restaurante.nombre}` })
  } catch (error) {
    res.status(500)
    res.send({ error: `Algo ocurrio: ${error}` })
  }
}

const actualizarRestaurante = async (req, res) => {
  try {
    const { body } = req
    const { ...body_message } = req.body
    //actualizar el restaurante
    const id_restaurante = body.id
    delete body.id
    const restaurante = await Restaurante.update(body, {
      where: {
        id: id_restaurante,
      },
    })

    // Publicar en colas
    publishRabbit(body_message)

    res.send({
      data: `Se actualizo la informacion del restaurante. ${restaurante}`,
    })
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
  const queue = "notification"

  const message = {
    message: "Notificar cambios en restaurante",
    data: body,
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

module.exports = { crearRestaurante, actualizarRestaurante, bdConnection }
