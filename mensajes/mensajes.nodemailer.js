const { transporter } = require("../middlewares/nodemailer.middlewares")

const registroExitoso = async (email, usuario) => {
  try {
    await transporter.sendMail({
      from: `"Tienda Online" <${process.env.GMAIL_APP_USER}>`,
      to: email,
      subject: "Te Registraste Exitosamente ✔",
      text: `Gracias por registrarte, ${usuario}. Bienvenido a nuestra tienda online.`,
      html: `
        <h2>¡Bienvenido/a a nuestra tienda online, ${usuario}!</h2>
        <p>Ahora podés acceder a nuestros servicios.</p>
        <p>¡Nos alegra tenerte con nosotros!</p>
        <br/>
        <p><i>tienda online</i></p>
      `,
    })

    return {
      msg: "Correo de confirmación enviado correctamente",
      statusCode: 200,
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    }
  }
}

const envioDeLaCompra = async (email, nombreProducto) => {
  try {
    await transporter.sendMail({
      from: `"Tienda Online" <${process.env.GMAIL_APP_USER}>`,
      to: email,
      subject: "¡Pago recibido con éxito!",
      text: `Gracias por tu compra. Hemos recibido tu pago por: ${nombreProducto}`,
      html: `
        <h3>Gracias por tu compra 🐶</h3>
        <p>Tu pago por <b>${nombreProducto}</b> fue procesado con éxito.</p>
        <p>Pronto recibirás más información sobre el envío.</p>
      `,
    })

    return {
      msg: "Correo de confirmación de compra enviado correctamente",
      statusCode: 200,
    }
  } catch (error) {
    return {
      error: error.message || "Error inesperado al enviar correo",
      statusCode: 500,
    }
  }
}

const recuperarContrasenia = async (token, email) => {
  const link =
    `${process.env.FRONTEND_URL}/restablecer-contrasenia?token=${token}`

  await transporter.sendMail({
    from: `"Tienda Online" <${process.env.GMAIL_APP_USER}>`,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h3>Recuperación de contraseña</h3>
      <p>Has solicitado recuperar tu contraseña.</p>
      <a href="${link}">Restablecer contraseña</a>
      <p>Si no realizaste esta solicitud, ignorá este correo.</p>
    `,
  })
}

module.exports = {
  registroExitoso,
  envioDeLaCompra,
  recuperarContrasenia,
}