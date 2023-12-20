//Importar el módelo
const Portfolio = require('../models/Portfolio')

//Método para listar todos los portafolios
const renderAllPortafolios = async(req,res)=>{
    //Almacenar todos los portafolios en la variable y convertir en json
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}

//Método para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//Método para mostrar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

//Método para guardar en la bdd lo capturado en el formulario
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.redirect('/portafolios')
}

//Método utilizado para actualizar el formulario
const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

//Método para actualizar en la base de datos lo capturado en el formulario
const updatePortafolio = async(req,res)=>{
    //Desestructurar en req.body
    const {title,category,description}= req.body
    //Actualizar en la base de datos
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //Redireccionar a la vista de portafolios
    res.redirect('/portafolios')
}

//Método para eliminar un portafolio
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}


//Exportación de modulos
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}