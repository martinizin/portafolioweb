//Importación del modelo
const Portfolio = require('../models/Portfolio')
//El controlador está encargado de trabajar en la lógica de la aplicación

//Método para listar todos los portafolios
const renderIndex = async(req,res)=>{
    //Consultar todos los portafolios, transformar a JSON y almacenarlos en la variable portafolios
    const portfolios = await Portfolio.find().lean()
    //Invoxar a la vista index y pasar a la variable portafolios
    res.render('index',{portfolios})
}

//Exportación de las variables
module.exports ={
    renderIndex
}