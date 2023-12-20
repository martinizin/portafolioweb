//Importar el módelo
const Portfolio = require('../models/Portfolio')

//Método para listar todos los portafolios

const renderAllPortafolios = async(req,res)=>{
    //Almacenar todos los portafolios del usuario que inicia sesión en la variable (lean) y luego convertir en json
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    //Invocar a la vista y mandar a la variable
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
    //crear una nueva instancia del portafolio
    const newPortfolio = new Portfolio({title,category,description})
    //Asociar al usuario que inicia sesión al portafolio
    newPortfolio.user = req.user._id
    //Almacenar en la BDD
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
    //Obtener un portafolio en base al 'id'
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Verificar que el usuario que actualice el portafolio sea el mismo que inicie sesión
    if(!(portfolio.user.toString() !== req.user._id.toString())) return res.redirect('/portafolios')
    const {title,category,description}= req.body
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
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