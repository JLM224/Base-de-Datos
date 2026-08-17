const ProductosModelo = require("../modelos/productos")
const cloudinary = require("../middlewares/cloudinary")

const obtenerTodosLosProductosServicio = async () => {
  try {
    const productos = await ProductosModelo.find()

    return {
      productos,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al obtener los productos",
      error: error.message,
      statusCode: 500
    }
  }
}

const obtenerProductosHabilitadosServicio = async () => {
  try {
    const productos = await ProductosModelo.find({habilitado: true})

    return{
      productos,
      statusCode: 200
    }
  } catch (error) {
    return{
      msg: "Error al obtener los productos habilitados",
      error: error.message,
      statusCode: 500
    }
  }
} 

const obtenerProductoPorIdServicio = async (idProducto) => {
  try {
    const producto = await ProductosModelo.findById(idProducto)

    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404
      }
    }

    return {
      producto,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al obtener el producto",
      error: error.message,
      statusCode: 500
    }
  }
}

const crearNuevoProductoServicio = async (body, file) => {
  try {
    let imagen = "";
    let public_id = ""

    if (file) {
      const imagenCloudinary = await cloudinary.uploader.upload(file.path)
      imagen = imagenCloudinary.secure_url
      public_id = imagenCloudinary.public_id }

    const nuevoProducto = new ProductosModelo({
      ...body,
      imagen,
      public_id
    })

  await nuevoProducto.save()

  return {
    msg: "Producto creado exitosamente",
    idProducto: nuevoProducto._id,
    statusCode: 201
  }
  } catch (error) {
    return {
    msg: "Error al crear el producto",
    error: error.message,
    statusCode: 500
  }
 }
}

const actualizarProductoPorIdServicio = async (idProducto, body, file) => {
  try {
    const producto = await ProductosModelo.findById(idProducto)

    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404
      }
    }

    if (body.nombre !== undefined) {
      producto.nombre = body.nombre
    }

    if (body.descripcion !== undefined) {
      producto.descripcion = body.descripcion
    }

    if (body.precio !== undefined) {
      producto.precio = body.precio
    }

    if (body.stock !== undefined) {
      producto.stock = body.stock
    }

    if (body.categoria !== undefined) {
      producto.categoria = body.categoria
    }

    if (file) {
      if (producto.public_id) {
        await cloudinary.uploader.destroy(producto.public_id)
      }

      const imagenCloudinary = await cloudinary.uploader.upload(file.path)

      producto.imagen = imagenCloudinary.secure_url
      producto.public_id = imagenCloudinary.public_id
    }

    await producto.save();

    return {
      msg: "Producto actualizado exitosamente",
      producto,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al actualizar el producto",
      error: error.message,
      statusCode: 500
    }
  }
}

const eliminarProductoPorIdServicio = async (idProducto) => {
  try {
    const producto = await ProductosModelo.findById(idProducto)

    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404
      }
    }

    if (producto.public_id) {
      await cloudinary.uploader.destroy(producto.public_id)
    }

    await producto.deleteOne()

    return {
      msg: "Producto eliminado exitosamente",
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al eliminar el producto",
      error: error.message,
      statusCode: 500
    }
  }
}

const cambiarEstadoProductoServicio = async (idProducto) => {
  try {
    const producto = await ProductosModelo.findById(idProducto)

    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404
      }
    }

    producto.habilitado = !producto.habilitado

    await producto.save()

    return {
      msg: `Producto ${producto.habilitado ? "habilitado" : "deshabilitado"}`,
      habilitado: producto.habilitado,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al cambiar el estado del producto",
      error: error.message,
      statusCode: 500
    }
  }
}

module.exports = {
  obtenerTodosLosProductosServicio,
  obtenerProductosHabilitadosServicio,
  obtenerProductoPorIdServicio,
  crearNuevoProductoServicio,
  actualizarProductoPorIdServicio,
  eliminarProductoPorIdServicio,
  cambiarEstadoProductoServicio
}