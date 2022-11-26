const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors=require('cors')
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//middleware
app.use(cors())
// Conexión a Base de datos
mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("conexion con la base de datos establecida")})
.catch((err)=>{console.log("Hubo un error: ",err)})
// import routes
const routes=require("./routes/routes");
const verifytoken=require("./controllers/tokenv")
// route middlewares
app.use("/api",routes);



// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})


