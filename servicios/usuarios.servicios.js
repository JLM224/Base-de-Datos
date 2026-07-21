const {recuperarContrasenia, registroExitoso} = require("../mensajes/mensajes.nodemailer")
const Usuario = require("../modelos/usuarios")
const Carrito = require("../modelos/carrito")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")
const crypto = require("crypto")

const obtenerTodosLosUsuariosServicio = async () => {
  try {
    const usuarios = await Usuario.find().select("-contrasenia")

    return {
      usuarios,
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error al obtener los usuarios",
      statusCode: 500
    }
  }
}

const obtenerUsuarioPorIdServicio = async (id) => {
  try {
    const usuario = await Usuario.findById(id).select("-contrasenia")

    if (!usuario) {
      return {
        mensaje: "Usuario no encontrado",
        statusCode: 404
      }
    }

    return {
      usuario,
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error al obtener el usuario",
      statusCode: 500
    }
  }
}

const crearUsuarioServicio = async (datosUsuario) => {
  try {
    const { usuario, email, telefono, contrasenia } = datosUsuario

    const usuarioExistente = await Usuario.findOne({ usuario })
    const emailExistente = await Usuario.findOne({ email })
    const telefonoExistente = await Usuario.findOne({ telefono })
    if (usuarioExistente) {
      return {
        mensaje: "El nombre de usuario ya está registrado",
        statusCode: 409
      }
    }
    if (emailExistente) {
      return {
        mensaje: "El email ya está registrado",
        statusCode: 409
      }
    }
    if (telefonoExistente) {
      return {
        mensaje: "El teléfono ya está registrado",
        statusCode: 409
      }
    }

    const contraseniaHasheada = await argon2.hash(contrasenia)

    const nuevoUsuario = await Usuario.create({
      usuario,
      email,
      telefono,
      contrasenia: contraseniaHasheada
    })

    await Carrito.create({
      idUsuario: nuevoUsuario._id,
      productos: []
    })

    await registroExitoso(email, usuario)

    return {
      mensaje: "Usuario creado correctamente",
      usuario: nuevoUsuario,
      statusCode: 201
    }
  } catch (error) {
    return {
      mensaje: "Error al crear el usuario",
      error: error.message,
      statusCode: 500
    }
  }
}

const actualizarUsuarioPorIdServicio = async (idUsuario, body) => {
  try {
    const camposPermitidos = ["usuario", "email", "telefono"]

    const actualizacion = Object.fromEntries(
      Object.entries(body).filter(([key, value]) =>
        camposPermitidos.includes(key) && value !== undefined
      )
    )

    if (Object.keys(actualizacion).length === 0) {
      return {
        mensaje: "No hay datos para actualizar",
        statusCode: 400
      }
    }

    const conflicto = await Usuario.findOne({
      _id: { $ne: idUsuario },
      $or: Object.entries(actualizacion).map(([key, value]) => ({
        [key]: value
      }))
    }).lean()

    if (conflicto) {
  if (
    actualizacion.usuario &&
    conflicto.usuario === actualizacion.usuario
  ) {
    return {
      mensaje: "El nombre de usuario ya está registrado",
      statusCode: 409,
    };
  }

  if (
    actualizacion.email &&
    conflicto.email === actualizacion.email
  ) {
    return {
      mensaje: "El email ya está registrado",
      statusCode: 409,
    };
  }

  if (
    actualizacion.telefono &&
    conflicto.telefono === actualizacion.telefono
  ) {
    return {
      mensaje: "El teléfono ya está registrado",
      statusCode: 409,
    };
  }
}

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      idUsuario,
      actualizacion,
      {
        new: true,
        runValidators: true,
        select: "-contrasenia"
      }
    )

    if (!usuarioActualizado) {
      return {
        mensaje: "Usuario no encontrado",
        statusCode: 404
      }
    }
    return {
      mensaje: "Usuario actualizado correctamente",
      data: usuarioActualizado,
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error al actualizar usuario",
      error: error.message,
      statusCode: 500
    }
  }
}

const eliminarUsuarioPorIdServicio = async (idUsuario) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario)

    if (!usuarioEliminado) {
      return {
        mensaje: "Usuario no encontrado",
        statusCode: 404
      }
    }
    await Carrito.findOneAndDelete({ idUsuario })
    return {
      mensaje: "Usuario eliminado correctamente",
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error al eliminar usuario",
      error: error.message,
      statusCode: 500
    }
  }
}

const iniciarSesionServicio = async (body) => {
  try {
    const usuarioExiste = await Usuario.findOne({
      usuario: body.usuario,
    })

    if (!usuarioExiste) {
      return {
        mensaje: "Usuario y/o contraseña incorrectos",
        statusCode: 400,
      }
    }

    const verificarContrasenia = await argon2.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    )

    if (!verificarContrasenia) {
      return {
        mensaje: "Usuario y/o contraseña incorrectos",
        statusCode: 400,
      }
    }

    const payload = {
      idUsuario: usuarioExiste._id,
      rol: usuarioExiste.rol,
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRETA,
      {
        expiresIn: "24h",
      }
    )

    return {
      mensaje: "Usuario logueado",
      data: {
        token,
        usuario: usuarioExiste.usuario,
        rol: usuarioExiste.rol,
        idUsuario: usuarioExiste._id
      },
      statusCode: 200,
    }
  } catch (error) {
    return {
      mensaje: "Error al iniciar sesión",
      error: error.message,
      statusCode: 500,
    }
  }
}

const recuperarContraseniaUsuarioServicio = async (email) => {
  try {
    const usuarioExiste = await Usuario.findOne({ email })

    if (!usuarioExiste) {
      return {
        mensaje: "Usuario no encontrado",
        statusCode: 404
      }
    }

    const tokenRecuperacion = crypto
      .randomBytes(32)
      .toString("hex")

    usuarioExiste.tokenRecuperacion = tokenRecuperacion

    usuarioExiste.expiraTokenRecuperacion = new Date(
      Date.now() + 60 * 60 * 1000
    )

    await usuarioExiste.save()

    await recuperarContrasenia(
      tokenRecuperacion,
      usuarioExiste.email
    )

    return {
      mensaje: "Correo de recuperación enviado",
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error al recuperar contraseña",
      error: error.message,
      statusCode: 500
    }
  }
}

const cambioDeContraseniaUsuarioTokenServicio = async (token, nuevaContrasenia) => {
  try {
    const usuario = await Usuario.findOne({
      tokenRecuperacion: token
    })

    if (!usuario) {
      return {
        mensaje: "Token inválido",
        statusCode: 400
      }
    }

    if (
      !usuario.expiraTokenRecuperacion ||
      usuario.expiraTokenRecuperacion < new Date()
    ) {
      return {
        mensaje: "Token expirado",
        statusCode: 401
      }
    }

    const contraseniaHasheada = await argon2.hash(
      nuevaContrasenia
    )

    usuario.contrasenia = contraseniaHasheada

    usuario.tokenRecuperacion = null
    usuario.expiraTokenRecuperacion = null

    await usuario.save()

    return {
      mensaje: "Se cambió la contraseña exitosamente",
      statusCode: 200
    }
  } catch (error) {
    return {
      mensaje: "Error interno del servidor",
      statusCode: 500,
      error: error.message
    }
  }
}

module.exports = {
  obtenerTodosLosUsuariosServicio,
  obtenerUsuarioPorIdServicio,
  crearUsuarioServicio,
  actualizarUsuarioPorIdServicio,
  eliminarUsuarioPorIdServicio,
  iniciarSesionServicio,
  recuperarContraseniaUsuarioServicio,
  cambioDeContraseniaUsuarioTokenServicio
}