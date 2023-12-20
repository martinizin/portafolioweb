//Importación de la clase router
const {Router} = require('express')

//Creación de una instancia
const router = Router()

//Ruta inicial (home-index)
router.get('/',(req,res)=>{
    res.render('index')
})

//Ruta del login
router.get('/login',(req,res)=>{
    res.render('login')
})

//Exportacion de router
module.exports = router