const carritoServicios = require("../servicios/carrito.servicios")

const crearCarrito = async (req, res) => {
  try {
    const carrito = await carritoServicios.crearCarrito(req.body.idUsuario)

    res.status(201).json(carrito)

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear carrito",
      error: error.message
    })
  }
}

const obtenerCarritoPorUsuario = async (req, res) => {
  try {
    const carrito = await carritoServicios.obtenerCarritoPorUsuario(req.params.idUsuario)

    res.json(carrito)

  } catch (error) {
    res.status(404).json({
      mensaje: "Error al obtener carrito",
      error: error.message
    })
  }
}

const agregarProducto = async (req, res) => {
  try {
    const { idUsuario, idProducto, cantidad } = req.body

    const carrito = await carritoServicios.agregarProducto(
      idUsuario,
      idProducto,
      cantidad
    )

    res.json(carrito)

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al agregar producto al carrito",
      error: error.message
    })
  }
}

const quitarProducto = async (req, res) => {
  try {
    const { idUsuario, idProducto } = req.body

    const carrito = await carritoServicios.quitarProducto(
      idUsuario,
      idProducto
    )

    res.json(carrito)

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al quitar producto del carrito",
      error: error.message
    })
  }
}

const actualizarCantidad = async (req, res) => {
  try {
    const { idUsuario, idProducto, cantidad } = req.body

    const carrito = await carritoServicios.actualizarCantidad(
      idUsuario,
      idProducto,
      cantidad
    )

    res.json(carrito)

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar cantidad",
      error: error.message
    })
  }
}

const vaciarCarrito = async (req, res) => {
  try {
    const carrito = await carritoServicios.vaciarCarrito(req.body.idUsuario)

    res.json(carrito)

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al vaciar carrito",
      error: error.message
    })
  }
}

module.exports = {
  crearCarrito,
  obtenerCarritoPorUsuario,
  agregarProducto,
  quitarProducto,
  actualizarCantidad,
  vaciarCarrito
}