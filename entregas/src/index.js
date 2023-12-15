const express = require("express")

const app = express()
const PORT = 3001
const entregasRoutes = require("./routes/entregas")

app.use(express.json())

//Routes
app.use("/api/entregas", entregasRoutes)

app.listen(PORT, () => {
  console.log("Server on port: ", PORT)
})
