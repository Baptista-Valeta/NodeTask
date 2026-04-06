const bodyParser = require('body-parser');

module.exports =  app => {
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use((req, resizeBy, next) => {
        delete req.body.id;
        next();
    })
}; 