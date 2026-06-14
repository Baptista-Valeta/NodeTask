const { BOOLEAN } = require("sequelize");

// console.log(process.env.NODE_ENV)

module.exports = app => {
   const env = process.env.NODE_ENV;

   // console.log({NODE_ENV: env})   

   if (env === "test") {
      return require(`./config.${env}.js`);
   }
   return require(`./config.development.js`);
}