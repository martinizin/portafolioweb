//Importación de la clase routers
const{Router} = require('express')
//Importación de
const {isAuthenticated} = require('../helpers/validate-auth')
//Creación de instancia
const router = Router()

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controllers.js')

    //RUTA PARA CARGAR LA VISTA DEL FORMULARIO
router.get('/portafolio/add',isAuthenticated, renderPortafolioForm)

 //RUTA PARA OBTENER LOS DATOS DEL FORMULARIO Y GUARDAR EN LA BDD
router.post('/portafolio/add',isAuthenticated, createNewPortafolio)

 //RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
router.get('/portafolios',isAuthenticated, renderAllPortafolios)

 //RUTA PARA CARGAR EL DETALLE DEL PORTAFOLIO
router.get('/portafolio/:id',isAuthenticated, renderPortafolio)

 //RUTA PARA CARGAR LA VISTA DEL FORMULARIO PARA ACTUALIZAR
router.get('/portafolio/edit/:id',isAuthenticated, renderEditPortafolioForm)

 //RUTA PARA OBTENER LOS DATOS DEL FORMULARIO Y GUARDAR (ACTUALIZAR) EN LA BDD
router.put('/portafolio/edit/:id',isAuthenticated, updatePortafolio)

 //RUTA PARA ELIMINAR EL PORTAFOLIO
router.delete('/portafolio/delete/:id',isAuthenticated,deletePortafolio)

//EXPORTACIÓN DE LA VARIABLE ROUTER
module.exports = router