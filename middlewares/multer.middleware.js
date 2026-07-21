const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  /*storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public")
    },
    filename: (req, file, cb) => {
      console.log(file)
      const ext = path.extname(file.originalname)
      const nombreFinalImagen = `${file.fieldname}-${Date.now()}${ext}`
      cb(null, nombreFinalImagen)
    }, */
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)

    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".webp") {
      cb(new Error("Extencion no soportada"), false)
    }
    cb(null, true)
  }
})