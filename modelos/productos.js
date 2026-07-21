const { Schema, model } = require("mongoose")

const ProductoEsquema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  imagen: {
    type: String
  },
  public_id: {
    type: String
  },
  categoria: {
    type: String,
    trim: true
  },
  habilitado: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const ProductosModelo = model("productos", ProductoEsquema)
module.exports = ProductosModelo