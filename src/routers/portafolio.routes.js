//Importación de la clase routers
const{Router} = require('express')

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
router.get('/portafolio/add', renderPortafolioForm)

 //RUTA PARA OBTENER LOS DATOS DEL FORMULARIO Y GUARDAR EN LA BDD
router.post('/portafolio/add', createNewPortafolio)

 //RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
router.get('/portafolios', renderAllPortafolios)

 //RUTA PARA CARGAR EL DETALLE DEL PORTAFOLIO
router.get('/portafolio/:id', renderPortafolio)

 //RUTA PARA CARGAR LA VISTA DEL FORMULARIO PARA ACTUALIZAR
router.get('/portafolio/edit/:id', renderEditPortafolioForm)

 //RUTA PARA OBTENER LOS DATOS DEL FORMULARIO Y GUARDAR (ACTUALIZAR) EN LA BDD
router.put('/portafolio/edit/:id', updatePortafolio)

 //RUTA PARA ELIMINAR EL PORTAFOLIO
router.delete('/portafolio/delete/:id', deletePortafolio)

//EXPORTACIÓN DE LA VARIABLE ROUTER
module.exports = router