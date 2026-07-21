const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: `${process.env.GMAIL_APP_USUARIO}`,
    pass: `${process.env.GMAIL_APP_CONTRASENIA}`,
  },
})

module.exports = { transporter }