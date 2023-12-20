//Importar cloudinary
const cloudinary = require('cloudinary').v2

//Realizar las configruaciones
cloudinary.config({ 
    //Establecemos las variables de entorno
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
//Función para guardar las imágenes en cloudinary
module.exports.uploadImage = async(filePath) => {
    //Guardar en cloudinary en la carpeta portafolio
    return await
     cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}
//Método para eliminar las imágenes de cloudinary
module.exports.deleteImage = async (publicId)=>{
    //Eliminar en cloudinary la imágen de la carpeta portafolio
    return await cloudinary.uploader.destroy(publicId)
}
