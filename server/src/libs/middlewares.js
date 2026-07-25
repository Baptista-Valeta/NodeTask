const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const logger = require('./logger');

module.exports =  app => {
    app.set("port", 3000); // cria uma variável port com o valor 3000
    app.use(bodyParser.json());
    app.use(morgan(':method - :status - :url - :response-time - :date', {
        stream: {
            write: (message) => {
                logger.info(message);
            },
        },
        stream: {
            write: (message) => {
                logger.error(message);
            }
        }

    }));
    app.use(cors({
        origin: 'http://localhos:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    app.use(compression());

    app.use(app.auth.initialize());
    
    app.use((req, res, next) => {
        if(req.body && typeof req.body === 'object')
            delete req.body.id
        else 
            req.body = {};
        
        next();
    });

    app.use(express.static("public"));
}; 