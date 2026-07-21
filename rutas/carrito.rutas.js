const express = require("express")
const router = express.Router()

const carritoControlador = require("../controladores/carrito.controladores")

router.post("/", carritoControlador.crearCarrito)

router.get("/:idUsuario", carritoControlador.obtenerCarritoPorUsuario)

router.post("/agregar", carritoControlador.agregarProducto)

router.post("/quitar", carritoControlador.quitarProducto)

router.put("/cantidad", carritoControlador.actualizarCantidad)

router.delete("/vaciar", carritoControlador.vaciarCarrito)

module.exports = router