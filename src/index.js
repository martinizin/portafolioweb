require('dotenv').config()

//Importamos la variable app
const app = require('./server.js')

//Importamos la función connection
const connection = require('./database.js')

//Invocamos la función
connection()

//Inicializar el servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})