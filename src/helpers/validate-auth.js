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