//Importamos express
const express = require('express')
//Importamos passport
const passport = require('passport');
//importamos passport-express
const session = require('express-session');
//Importamos el path
const path = require('path');
//Importar fileupload
const fileUpload = require('express-fileupload')

//Importamos handlebars
const { engine }  = require('express-handlebars')

//Importar método override
const methodOverride = require('method-override');

// Inicializaciones
const app = express()
require('./config/passport')

// Configuraciones 
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
//Configuracones de file Upload
app.use(fileUpload({
    //Establecer archivos temporales
    useTempFiles : true,
    //Especificar el directorio
    tempFileDir : './uploads'
}));

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
app.use(methodOverride('_method'))
//ESTABLECER LA SESIÓN DEL USUARIO
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
//INICIALIZACIÓN
app.use(passport.initialize())
//MANTENER LA SESIÓN DEL USUARIO
app.use(passport.session())


// Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

// Rutas 
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))


module.exports = app