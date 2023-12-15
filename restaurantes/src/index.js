const express = require("express")

const app = express()
const PORT = 3003
const restaurantesRoutes = require("./routes/restaurantes")

app.use(express.json())

//Routes
app.use("/api/restaurantes", restaurantesRoutes)

app.listen(PORT, () => {
  console.log("Server on port: ", PORT)
})
