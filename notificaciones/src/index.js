const express = require("express")

const app = express()
const PORT = process.env.PORT || 3004
const notificacionesRoutes = require("./routes/notificaciones")

app.use(express.json())

//Routes
app.use("/api/notificaciones", notificacionesRoutes)

app.listen(PORT, () => {
  console.log("Server on port: ", PORT)
})
