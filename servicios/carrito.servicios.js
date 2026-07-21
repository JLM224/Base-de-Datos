const Carrito = require("../modelos/carrito")
const Producto = require("../modelos/productos")

const crearCarrito = async (idUsuario) => {
  try {
    const carritoExistente = await Carrito.findOne({ idUsuario })

    if (carritoExistente) {
      return carritoExistente
    }

    const nuevoCarrito = new Carrito({
      idUsuario,
      productos: []
    })

    return await nuevoCarrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const obtenerCarritoPorUsuario = async (idUsuario) => {
  try {
    const carrito = await Carrito.findOne({ idUsuario })
      .populate("productos.idProducto")

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    return carrito

  } catch (error) {
    throw new Error(error.message)
  }
}

const agregarProducto = async (idUsuario, idProducto, cantidad = 1) => {
  try {
    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    const productoExiste = await Producto.findById(idProducto)

    if (!productoExiste) {
      throw new Error("Producto no existe")
    }

    const productoEnCarrito = carrito.productos.find(
      (p) => p.idProducto.toString() === idProducto
    )

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad
    } else {
      carrito.productos.push({
        idProducto,
        cantidad
      })
    }

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const quitarProducto = async (idUsuario, idProducto) => {
  try {
    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    carrito.productos = carrito.productos.filter(
      (p) => p.idProducto.toString() !== idProducto
    )

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const actualizarCantidad = async (idUsuario, idProducto, cantidad) => {
  try {
    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    const producto = carrito.productos.find(
      (p) => p.idProducto.toString() === idProducto
    )

    if (!producto) {
      throw new Error("Producto no está en el carrito")
    }

    producto.cantidad = cantidad

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const vaciarCarrito = async (idUsuario) => {
  try {
    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    carrito.productos = []

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
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