//Importamos express
const express = require('express')

//Importamos el path
const path = require('path');

//Importamos handlebars
const { engine }  = require('express-handlebars')
// Inicializaciones
const app = express()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

//Establecemos el directorio de las vistas
app.set('views',path.join(__dirname, 'views'))
//Configuración para el botón de plantilla
//1 Archivo master (Master page)
//2 Establecemos el directorio layouts
//3 Establecemos el directorio partials
//4 Extensión de las páginas (.hbs)
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
//Establecemos el botón de plantillas
app.set('view engine','.hbs')

// Middlewares 
app.use(express.urlencoded({extended:false}))


// Variables globales

// Rutas 
app.use(require('./routers/index.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))


module.exports = app