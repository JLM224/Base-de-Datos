const mongoose = require("mongoose")

mongoose
.connect(process.env.MONGO_CONNECT)
.then(() => console.log("base de datos conectada"))
.catch((error) => console.log(error));