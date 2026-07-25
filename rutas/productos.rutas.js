const express = require("express")
const multerMiddleware = require("../middlewares/multer.middleware")
const auth = require("../middlewares/auth")
const {
  obtenerTodosLosProductos,
  obtenerProductosHabilitados,
  obtenerProductoPorId,
  crearNuevoProducto,
  actualizarProductoPorId,
  eliminarProductoPorId,
  cambiarEstadoProducto,
} = require("../controladores/productos.controladores")

const router = express.Router()

router.get("/", obtenerTodosLosProductos)

router.get("/", obtenerProductosHabilitados)

router.get("/:id", obtenerProductoPorId)

router.post("/", auth("admin"), multerMiddleware.single("imagen"), crearNuevoProducto)

router.put("/:id", auth("admin"), multerMiddleware.single("imagen"), actualizarProductoPorId)

router.put("/cambiarEstado/:idProducto", auth("admin"), cambiarEstadoProducto)

router.delete("/:id", auth("admin"), eliminarProductoPorId)

module.exports = router