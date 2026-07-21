const {
  obtenerTodosLosProductosServicio,
  obtenerProductoPorIdServicio,
  crearNuevoProductoServicio,
  actualizarProductoPorIdServicio,
  eliminarProductoPorIdServicio,
  cambiarEstadoProductoServicio,
} = require("../servicios/productos.servicios")

const obtenerTodosLosProductos = async (req, res) => {
  const { productos, msg, error, statusCode } =
    await obtenerTodosLosProductosServicio()

  res.status(statusCode).json(
    error
      ? { msg, error }
      : { productos }
  )
}

const obtenerProductoPorId = async (req, res) => {
  const { producto, msg, error, statusCode } =
    await obtenerProductoPorIdServicio(req.params.id)

  res.status(statusCode).json(
    error
      ? { msg, error }
      : producto
        ? { producto }
        : { msg }
  )
}

const crearNuevoProducto = async (req, res) => {
  const { msg, idProducto, error, statusCode } =
    await crearNuevoProductoServicio(req.body, req.file)

  res.status(statusCode).json(
    error
      ? { msg, error }
      : { msg, idProducto }
  )
}

const actualizarProductoPorId = async (req, res) => {
  const { msg, producto, error, statusCode } =
    await actualizarProductoPorIdServicio(
      req.params.id,
      req.body,
      req.file
    )

  res.status(statusCode).json(
    error
      ? { msg, error }
      : { msg, producto }
  )
}

const eliminarProductoPorId = async (req, res) => {
  const { msg, error, statusCode } =
    await eliminarProductoPorIdServicio(req.params.id)

  res.status(statusCode).json(
    error
      ? { msg, error }
      : { msg }
  )
}

const cambiarEstadoProducto = async (req, res) => {
  const { msg, error, statusCode } =
    await cambiarEstadoProductoServicio(req.params.idProducto)

  res.status(statusCode).json(
    error
      ? { msg, error }
      : { msg }
  )
}

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearNuevoProducto,
  actualizarProductoPorId,
  eliminarProductoPorId,
  cambiarEstadoProducto,
}