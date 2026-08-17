const { Schema, model } = require("mongoose")

const EsquemaCarrito = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
    unique: true
  },
  productos: [
    {
      idProducto: {
        type: Schema.Types.ObjectId,
        ref: "productos",
        required: true
      },
      cantidad: {
        type: Number,
        default: 1,
        min: 1
      }
    }
]},
{
  timestamps: true
})

const CarritosModelo = model("Carrito", EsquemaCarrito)
module.exports = CarritosModelo