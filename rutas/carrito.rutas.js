const express = require("express")
const router = express.Router()

const carritoControlador = require("../controladores/carrito.controladores")
const auth = require("../middlewares/auth")

router.post("/", auth("usuario"), carritoControlador.crearCarrito)

router.get("/", auth("usuario"), carritoControlador.obtenerCarritoPorUsuario)

router.post("/agregar", auth("usuario"), carritoControlador.agregarProducto)

router.delete("/quitar", auth("usuario"), carritoControlador.quitarProducto)

router.put("/cantidad", auth("usuario"), carritoControlador.actualizarCantidad)

router.delete("/vaciar", auth("usuario"), carritoControlador.vaciarCarrito)

module.exports = router