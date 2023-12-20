//CREACIÓN DE UN MÉTODO PARA VALIDAR LA PROTECCIÓN DE RUTAS Y A LA VEZ EXPORTAR LA FUNCIÓN
module.exports.isAuthenticated = (req,res,next)=>{
    //VALIDAR SI EXISTE UNA AUTENTICACIÓN
    if(req.isAuthenticated()){
        //PROCESO DE CONTINUAR
        return next()
    }
    //PROCESO DE REDIRECCIÓN HACIA EL LOGIN
    res.redirect('/user/login')
}

//Creación de un método para validar  lo siguiente “Si el usuario ya está autenticado
//redirige a otra página” , caso contrario se presenta la página del login.
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}