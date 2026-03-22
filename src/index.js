const express = require('express');
const consign = require('consign');

const app = express();

app.models = {}; // Iniciar o app.modules

consign()
    .include("src/database.js")()
    .then("src/models")
    .then("src/libs/middlewares.js")
    .then("src/routes")
    .then("src/libs/boot.js")
    .into(app);