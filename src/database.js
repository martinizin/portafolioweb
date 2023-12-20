//Importación de moongose
const mongoose = require('mongoose')

//Cadena de conexión que utiliza MongoDBAtlas
//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'

//Cadena de conexión local
//const MONGODB_URI = 'mongodb://localhost:27017/portafolio'

//Función para conectar a la base 
connection = async()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

//Exportar la función
module.exports = connection