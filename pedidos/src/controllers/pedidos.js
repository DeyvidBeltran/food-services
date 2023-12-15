const db = require("../config/sequelize")
const ampq = require("amqplib")
const Pedido = require("../models/pedido")
const Restaurante = require("../models/restaurante")
const Cliente = require("../models/cliente")

const rabbitSettings = {
  protocol: "amqp",
  hostname: "rabbitmq",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanismo: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
}

const crearPedido = async (req, res) => {
  try {
    const { body } = req

    // verificar que el restaurante esta activo y exista
    const restaurante = await Restaurante.findOne({
      where: {
        id: body.id_restaurante,
        activo: true,
      },
    })

    if (!restaurante) {
      throw new Error("El restaurante no existe o no está activo")
    }
    // verificar que el cliente exista
    const cliente = await Cliente.findOne({
      where: {
        id: body.id_cliente,
      },
    })

    if (!cliente) {
      throw new Error("El cliente no existe")
    }

    // BD
    const pedido = await Pedido.create(body)

    // Colas
    connectRabbit(body)

    res.send({ data: `Se creo el pedido exitosamente` })
  } catch (error) {
    res.status(500)
    res.send({ error: `Algo ocurrio: ${error}` })
  }
}

const actualizarPedido = async (data) => {
  try {
    const id_pedido = data.id_pedido
    delete data.id_pedido
    const pedido = await Pedido.update(data, {
      where: {
        id: id_pedido,
      },
    })
    console.log("Se actualizo el pedido exitosamente", pedido)
  } catch (error) {
    console.error("Hubo un error en la actualizacion", error)
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
  const queue = "pedidos"

  const message = {
    message: "Pedido creado exitosamente",
    data: body,
    process: "crear",
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

async function consumeRabbit() {
  const queue = "updated"
  try {
    const ampqConnect = await ampq.connect(rabbitSettings)
    console.log("Connection created with Rabbit...")

    const channel = await ampqConnect.createChannel()
    console.log("Channel created.")

    const res = await channel.assertQueue(queue)
    console.log("Queue created.")

    console.log(`Waiting messages from ${queue}`)
    channel.consume(queue, (message) => {
      let mensaje = JSON.parse(message.content.toString())
      console.log(`Recibido de mensaje: ${mensaje.message}`)
      //actualiza pedido
      if (mensaje.process === "entregas" || mensaje.process === "pagos") {
        actualizarPedido(mensaje.data)
        channel.ack(message)
      }
    })
  } catch (error) {
    console.log(`Error en Rabbit: ${error}`)
  }
}

module.exports = { crearPedido, bdConnection, consumeRabbit }
