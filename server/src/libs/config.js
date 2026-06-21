const { BOOLEAN } = require("sequelize");

// console.log(process.env.NODE_ENV)

module.exports = app => {
   const env = process.env.NODE_ENV || "development";
   const development = require('./config.development')

   if (env === "test") {
      return require(`./config.${env}.js`);
   };


   return development;
}