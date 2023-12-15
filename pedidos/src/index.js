const express = require("express")

const app = express()
const PORT = 3000
const pedidosRoutes = require("./routes/pedidos")

app.use(express.json())

//Routes
app.use("/api/pedidos", pedidosRoutes)

app.listen(PORT, () => {
  console.log("Server on port: ", PORT)
})
