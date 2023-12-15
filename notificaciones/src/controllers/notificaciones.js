const db = require("../config/sequelize")
const ampq = require("amqplib")
const nodeMailer = require("nodemailer")
const Pedido = require("../models/pedido")
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

const bdConnection = async () => {
  try {
    await db.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

async function notificarUsuario(body) {
  const config_mail = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "testd4bu@gmail.com",
      pass: "oapawklpzcoxovjh",
    },
  }

  try {
    //Traer pedido
    const pedido = await Pedido.findOne({
      where: {
        id_restaurante: body.data.id,
      },
    })

    //Traer cliente
    const cliente = await Cliente.findOne({
      where: {
        id: pedido.dataValues.id_cliente,
      },
    })

    const datos = JSON.stringify(body.data)

    const message = {
      from: "testd4bu@gmail.com",
      to: cliente.dataValues.correo,
      subject: body.message,
      text: `Se realizaron los siguientes cambios en los datos: ${datos}`,
    }

    const transport = nodeMailer.createTransport(config_mail)

    const info = await transport.sendMail(message)

    console.log("Mensaje enviado created.")

    return true
  } catch (error) {
    throw new Error(`Error en las notificaciones: ${error}`)
  }
}

async function enviarNotificaciones(req, res) {
  const queue = "notification"
  try {
    const ampqConnect = await ampq.connect(rabbitSettings)
    console.log("Connection created with Rabbit...")

    const channel = await ampqConnect.createChannel()
    console.log("Channel created.")

    await channel.assertQueue(queue)
    console.log("Queue created.")

    console.log(`Waiting messages from ${queue}`)
    channel.consume(queue, (message) => {
      let mensaje = JSON.parse(message.content.toString())
      console.log(`Recibido de mensaje: ${mensaje.message}`)

      try {
        //Notificar al cliente
        notificarUsuario(mensaje)
        channel.ack(message)
        res.send({ data: `Notificacion enviada exitosamente` })
      } catch (error) {
        res.send({ error: `Error en notificaciones: ${error}` })
      }
    })
  } catch (error) {
    console.log(`Error en Rabbit: ${error}`)
  }
}

module.exports = { bdConnection, enviarNotificaciones }
