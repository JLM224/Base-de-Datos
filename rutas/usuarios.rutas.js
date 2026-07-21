const express = require("express")
const {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  iniciarSesion,
  recuperarContraseniaUsuario,
  cambioDeContraseniaUsuarioToken
} = require("../controladores/usuarios.controladores")
const auth = require("../middlewares/auth")
const router = express.Router()

router.post("/", crearUsuario)

router.get("/", auth("admin"), obtenerTodosLosUsuarios)

router.get("/:id", auth("admin"), obtenerUsuarioPorId)

router.put("/:id", auth("admin"), actualizarUsuarioPorId)

router.delete("/:id", auth("admin"), eliminarUsuarioPorId)

router.post("/login", iniciarSesion)

router.post("/recuperar-contrasenia", recuperarContraseniaUsuario)

router.post("/cambiar-contrasenia", cambioDeContraseniaUsuarioToken)

module.exports = router