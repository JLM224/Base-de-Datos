const {
  obtenerTodosLosUsuariosServicio,
  obtenerUsuarioPorIdServicio,
  crearUsuarioServicio,
  actualizarUsuarioPorIdServicio,
  eliminarUsuarioPorIdServicio,
  iniciarSesionServicio,
  recuperarContraseniaUsuarioServicio,
  cambioDeContraseniaUsuarioTokenServicio
} = require("../servicios/usuarios.servicios")

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const resultado = await obtenerTodosLosUsuariosServicio()
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const resultado = await obtenerUsuarioPorIdServicio(req.params.id)
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const crearUsuario = async (req, res) => {
  try {
    const resultado = await crearUsuarioServicio(req.body)
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const actualizarUsuarioPorId = async (req, res) => {
  try {
    const resultado = await actualizarUsuarioPorIdServicio(req.params.id, req.body)
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const eliminarUsuarioPorId = async (req, res) => {
  try {
    const resultado = await eliminarUsuarioPorIdServicio(req.params.id)
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const iniciarSesion = async (req, res) => {
  try {
    const resultado = await iniciarSesionServicio(req.body)
    return res.status(resultado.statusCode).json(resultado)
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del controlador",
      error: error.message
    })
  }
}

const recuperarContraseniaUsuario = async (req, res) => {
  try {
    const { email } = req.body

    const respuesta =
      await recuperarContraseniaUsuarioServicio(email)

    return res.status(respuesta.statusCode).json({ mensaje: respuesta.mensaje })
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    })
  }
}

const cambioDeContraseniaUsuarioToken = async (req, res) => {
  try {
    const { token, nuevaContrasenia } = req.body

    const respuesta =
      await cambioDeContraseniaUsuarioTokenServicio(
        token,
        nuevaContrasenia
      )
    return res.status(respuesta.statusCode).json({ mensaje: respuesta.mensaje })
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    })
  }
}

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  iniciarSesion,
  recuperarContraseniaUsuario,
  cambioDeContraseniaUsuarioToken
}