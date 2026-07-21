require("./base_de_datos/config.db")
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public",express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(morgan("dev"))
app.disable("x-powered-by")

const productosRutas = require("./rutas/productos.rutas")
const usuariosRutas = require("./rutas/usuarios.rutas")
const carritosRutas = require("./rutas/carrito.rutas")

app.use("/productos", productosRutas)
app.use("/usuarios", usuariosRutas)
app.use("/carritos", carritosRutas)

app.use((req, res, next) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  })
})

app.use((err, req, res, next) => {
  const status = err.statusCode || 500

  res.status(status).json({
    error: err.message || "Error interno del servidor"
  })
})

app.listen(3001, () => {
  console.log("Servidor ejecutándose en puerto 3001")
})