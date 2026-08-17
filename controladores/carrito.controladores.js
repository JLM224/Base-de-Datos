const carritoServicios = require("../servicios/carrito.servicios")

const crearCarrito = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const carrito = await carritoServicios.crearCarritoServicio(idUsuario)

    res.status(201).json({
      mensaje: "Carrito creado correctamente",
      carrito
    })

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear carrito",
      error: error.message
    })
  }
}

const obtenerCarritoPorUsuario = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const carrito = await carritoServicios.obtenerCarritoPorUsuarioServicio(idUsuario)

    res.status(200).json({
      mensaje: "Carrito obtenido correctamente",
      carrito
    })

  } catch (error) {
    res.status(404).json({
      mensaje: "Error al obtener carrito",
      error: error.message
    })
  }
}

const agregarProducto = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const { idProducto, cantidad } = req.body

    const carrito = await carritoServicios.agregarProductoServicio(
      idUsuario,
      idProducto,
      cantidad
    )

    res.status(200).json({
      mensaje: "Producto agregado al carrito",
      carrito
    })

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al agregar producto al carrito",
      error: error.message
    })
  }
}

const quitarProducto = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const { idProducto } = req.body

    const carrito = await carritoServicios.quitarProductoServicio(
      idUsuario,
      idProducto
    )

    res.status(200).json({
      mensaje: "Producto eliminado del carrito",
      carrito
    })

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al quitar producto del carrito",
      error: error.message
    })
  }
}

const actualizarCantidad = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const { idProducto, cantidad } = req.body

    const carrito = await carritoServicios.actualizarCantidadServicio(
      idUsuario,
      idProducto,
      cantidad
    )

    res.status(200).json({
      mensaje: "Cantidad actualizada correctamente",
      carrito
    })

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar cantidad",
      error: error.message
    })
  }
}

const vaciarCarrito = async (req, res) => {
  try {
    const idUsuario = req.user.idUsuario

    const carrito = await carritoServicios.vaciarCarritoServicio(idUsuario)

    res.status(200).json({
      mensaje: "Carrito vaciado correctamente",
      carrito
    })

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