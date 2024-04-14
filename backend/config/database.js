const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URI,{useNewURLParser:true,useUnifiedTopology:true
    }).then((data) => {
            console.log(`MongoDb connected with server: ${data.connection.host}`);
        }).catch((err) => {
            console.log(err);
        })
}

module.exports = connectDB;