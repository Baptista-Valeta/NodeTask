const { BOOLEAN } = require("sequelize");

module.exports = app => {
    const env = process.env.NODE_ENV;
    if (BOOLEAN(env)) {
        return require(`./config.${env}.js`);
    }
    return require (`./config.development.js`);
}