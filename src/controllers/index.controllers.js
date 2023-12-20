//El controlador está encargado de trabajar en la lógica de la aplicación

//Renderizar la página inicial
const renderIndex = (req,res)=>{
    res.render('index')
}

//Renderizar la página login
const renderLogin = (req,res)=>{
    res.render('login')
}

//Exportación de las variables
module.exports ={
    renderIndex, 
    renderLogin
}