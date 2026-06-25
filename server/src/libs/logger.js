const fs = require('fs');
const winston = require('winston');

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs');
};

module.exports = new winston.createLogger({
    // format: winston.format.combine(
    //     winston.format.errors({stack: true}),
    //     winston.format.json()
    // ),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/app.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false
        }),

        new winston.transports.File({
            level: 'error',
            filename: 'logs/error.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false
        })
    ]
});