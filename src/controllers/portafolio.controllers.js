//Importar el módelo
const Portfolio = require('../models/Portfolio')
//Importar el método upload
const { uploadImage,deleteImage } = require('../config/cloudinary')
//Importar método para eliminar imagen

//Importar fs
const fs = require('fs-extra')
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
    //Validar la imágen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    //Invocar el método para que se almacene en cloudinary
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        //Cargar el public_id
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    //Eliminar los archivos temporales
    await fs.unlink(req.files.image.tempFilePath)
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
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        //Verificar si el usuario quiere verificar la imagen
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //Almacenar la información
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

//Método para eliminar un portafolio
const deletePortafolio = async(req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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