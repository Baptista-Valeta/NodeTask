const dotenv = require("dotenv");
dotenv.config()

const express = require('express');
const consign = require('consign');

const app = express();

app.models = {}; // Iniciar o app.modules
consign({verbose: false})
    .include("src/libs/config.js")
    .then("src/database.js")
    // .then("src/routes/token.js")
    .then("src/auth.js")
    .then("src/libs/middlewares.js")
    .then("src/routes")
    .then("src/libs/boot.js")
    .into(app);


module.exports = app; // exportar a api