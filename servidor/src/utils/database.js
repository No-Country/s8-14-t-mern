const mongoose = require("mongoose");

const config = require("../config");



const dataBase = () => {

  mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("Database connected")
    })
    .catch(err => {
      console.log(err)
    });
    
}; 


module.exports = dataBase; 