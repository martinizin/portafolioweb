const mongoose = require('mongoose')
const {DBUSER,DBPASSWORD,DBNAME} = process.env
MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.23vp8zt.mongodb.net/${DBNAME}`



connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}
module.exports = connection