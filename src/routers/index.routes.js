//Importación de la clase router
const {Router} = require('express')
const { renderIndex, renderLogin } = require('../controllers/index.controllers')

//Importación de las funciones

//Creación de una instancia
const router = Router()

//Ruta inicial (home-index)
router.get('/',renderIndex)

//Ruta del login
router.get('/login',renderLogin)

//Exportacion de router
module.exports = router