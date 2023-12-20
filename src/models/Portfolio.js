
//Importación del esquema y el modelo
const {Schema, model} = require('mongoose')

//Creación del esquema de la tabla de la base de datos
const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
    },
    image:{
    public_id:String,
    secure_url:String
}
},{
    timestamps:true
})

//Exportación del modelo y el esquema
module.exports = model('portfolio',portfolioSchema)