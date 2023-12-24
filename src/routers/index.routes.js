//Importación de la clase router
const {Router} = require('express')
const { renderIndex } = require('../controllers/index.controllers')

//Importación de las funciones

//Creación de una instancia
const router = Router()

//Ruta inicial (home-index)
router.get('/',renderIndex)



//Exportacion de router
module.exports = router