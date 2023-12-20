//IMPORTACIÓN DEL MODELO
const User = require('../models/User')
//IMPORTACIÓN DE PASSPORT
const passport = require("passport")
//MÉTODO PARA MOSTRAR EL FORMULARIO DE REGISTRO
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//MÉTODO PARA CAPTURAR LA INFORMACIÓN DEL FORMULARIO Y ALMACENAR EN LA BDD
const registerNewUser = async(req,res)=>{
    //OBTENER LOS DATOS EL REQ.BODY
    const{name,email,password,confirmpassword} = req.body
    //VALIDAR SI TODOS LOS CAMPOS ESTÁN LLENOS, MEDIANTE EL MÉTODO INCLUDE
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //VALIDAR LA CONTRASEÑA, SI EL PASSWORD Y CONFIRM PASSWORD SON IGUALES
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    //CONSULTA A LA BDD PARA OBTENNER UN USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    //VERIFIFCAR SI EL USUARIO YA SE ENCUENTRA REGISTRADO
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //CREAR UNA NUEVA INSTANCIA PARA CREAR/REGISTRAR UN NUEVO USUARIO
    const newUser = await new User({name,email,password,confirmpassword})
    //ENCRIPTAR EL PASSWORD
    newUser.password = await newUser.encrypPassword(password)
    //GUARDAR EN LA BDD
    newUser.save()
    //CUANDO EL USUARIO SE REGISTRE, LO REDIRECCIONARÁ A LA RUTA LOGIN
    res.redirect('/user/login')
}

//MÉTODO PARA MOSTRAR EL FORMULARIO LOGIN
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

//MÉTODO PARA REALIZAR EL INICIO DE SESIÓN CON LOS DATOS DEL FORMULARIO
const loginUser =passport.authenticate('local',{
    //Si todo sale mal, se redirecciona hacia el login
    failureRedirect:'/user/login',
    //Si todo sale bien, redirecciona hacia la vista de portafolios
    successRedirect:'/portafolios'
})

//MÉTODO PARA REALIZAR EL CIERRE DE SESIÓN
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

//EXPORTACIÓN DE LOS MÉTODOS (CONTROLADORES)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}