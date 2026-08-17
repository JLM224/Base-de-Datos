const Carrito = require("../modelos/carrito")
const Producto = require("../modelos/productos")

const crearCarritoServicio = async (idUsuario) => {
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

const obtenerCarritoPorUsuarioServicio = async (idUsuario) => {
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

const agregarProductoServicio = async (idUsuario, idProducto, cantidad = 1) => {
  try {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new Error("La cantidad debe ser un número entero mayor a 0")
    }

    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    const producto = await Producto.findById(idProducto)

    if (!producto) {
      throw new Error("Producto no existe")
    }

    if (!producto.habilitado) {
      throw new Error("El producto no está disponible")
    }

    const productoEnCarrito = carrito.productos.find(
      (p) => p.idProducto.toString() === idProducto
    )

    if (productoEnCarrito) {

      const nuevaCantidad = productoEnCarrito.cantidad + cantidad

      if (nuevaCantidad > producto.stock) {
        throw new Error(
          `No hay suficiente stock. Stock disponible: ${producto.stock}`
        )
      }

      productoEnCarrito.cantidad = nuevaCantidad

    } else {

      if (cantidad > producto.stock) {
        throw new Error(
          `No hay suficiente stock. Stock disponible: ${producto.stock}`
        )
      }

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

const quitarProductoServicio = async (idUsuario, idProducto) => {
  try {

    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    const productoExiste = carrito.productos.some(
      (p) => p.idProducto.toString() === idProducto
    )

    if (!productoExiste) {
      throw new Error("El producto no está en el carrito")
    }

    carrito.productos = carrito.productos.filter(
      (p) => p.idProducto.toString() !== idProducto
    )

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const actualizarCantidadServicio = async (idUsuario, idProducto, cantidad) => {
  try {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new Error("La cantidad debe ser un número entero mayor a 0")
    }

    const carrito = await Carrito.findOne({ idUsuario })

    if (!carrito) {
      throw new Error("Carrito no encontrado")
    }

    const productoEnCarrito = carrito.productos.find(
      (p) => p.idProducto.toString() === idProducto
    )

    if (!productoEnCarrito) {
      throw new Error("El producto no está en el carrito")
    }

    const producto = await Producto.findById(idProducto)

    if (!producto) {
      throw new Error("Producto no existe")
    }

    if (!producto.habilitado) {
      throw new Error("El producto no está disponible")
    }

    if (cantidad > producto.stock) {
      throw new Error(
        `No hay suficiente stock. Stock disponible: ${producto.stock}`
      )
    }

    productoEnCarrito.cantidad = cantidad

    return await carrito.save()

  } catch (error) {
    throw new Error(error.message)
  }
}

const vaciarCarritoServicio = async (idUsuario) => {
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
  crearCarritoServicio,
  obtenerCarritoPorUsuarioServicio,
  agregarProductoServicio,
  quitarProductoServicio,
  actualizarCantidadServicio,
  vaciarCarritoServicio
}