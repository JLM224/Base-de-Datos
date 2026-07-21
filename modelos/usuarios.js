const { Schema, model } = require("mongoose")

const EsquemaUsuarios = new Schema({
  usuario: {
    type: String,
    required: [true, "Campo usuario obligatorio"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    required: [true, "Campo teléfono obligatorio"],
    unique: true,
    trim: true
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario"
  },
  contrasenia: {
    type: String,
    required: [true, "Campo contraseña obligatorio"],
    trim: true,
  },
tokenRecuperacion: {
  type: String,
  default: null
},
expiraTokenRecuperacion: {
  type: Date,
  default: null
}},
{
  timestamps: true
})

const ModeloUsuarios = model("usuarios", EsquemaUsuarios)
module.exports = ModeloUsuarios