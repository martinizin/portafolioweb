//Importación de la clase router
const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser, confirmEmail } = require('../controllers/user.controller')
const router = Router()
//Importación de la función
const { redirectIfAuthenticated } = require('../helpers/validate-auth')


//RUTA PARA MOSTRAR EL FORMULARIO DE REGISTRO
router.get('/user/register', renderRegisterForm)
//RUTA PARA CAPTURAR LA INFORMACIÓN DEL FORMULARIO Y ALMACENAR EN LA BDD
router.post('/user/register',registerNewUser)

//RUTA PARA MOSTRAR EL FORMULARIO LOGIN
router.get('/user/login',redirectIfAuthenticated, renderLoginForm)
//RUTA PARA REALIZAR EL INICIO DE SESIÓN CON LOS DATOS DEL FORMULARIO
router.post('/user/login',loginUser)

//RUTA PARA REALIZAR EL CIERRE DE SESIÓN
router.post('/user/logout',logoutUser)

//RUTA PARA CONFIRMAR EL EMAIL
router.get('/user/confirmar/:token',confirmEmail)
//EXPORTAR LA VARIABLE ROUTER
module.exports =router