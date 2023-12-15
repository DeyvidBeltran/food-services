const express = require("express")

const app = express()
const PORT = 3002
const pagosRoutes = require("./routes/pagos")

app.use(express.json())

//Routes
app.use("/api/pagos", pagosRoutes)

app.listen(PORT, () => {
  console.log("Server on port: ", PORT)
})
