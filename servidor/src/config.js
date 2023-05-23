require("dotenv").config()



const config = {

  port: process.env.PORT || 9000,
  nodeENV: process.env.NODE_ENV || "development",
  database: process.env.DB_URI
  
};


module.exports = config; 