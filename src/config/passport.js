const passport = require('passport')
const User = require('../models/User')

//ESTABLECER LA ESTRATEGIA
const LocalStrategy = require('passport-local').Strategy


//CONFIGURACIÓN DE LA ESTRATEGIA
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    //CONSULTA A LA BDD PARA OBTENER EL USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    //VERIFICAR SI EXISTE EL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //VERIFICAR LA CONTRASEÑA DEL FORMULARIO VS BDD
    const passwordUser = await userBDD.matchPassword(password)
    //VERIFICAR SI LA CONTRASEÑA DE FORM Y BDD COINCIDEN
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    //VALIDAR SI EL USUARIO PUEDE INICIAR SESIÓN SI O SOLO SI CONFIRMÓ SU CUENTA DE EMAIL
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    //MANDAR EL USUARIO
    return done(null,userBDD)
}))


//REALIZAR EL PROCESO DE SERIALIZAR EL USUARIO (ENCRIPTAR)
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//REALIZAR EL PROCESO DE DESEREALIZACIÓN
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});