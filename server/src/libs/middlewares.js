const bodyParser = require("body-parser");

module.exports =  app => {
    app.set("port", 3000); // cria uma variável port com o valor 3000
    app.use(bodyParser.json());
    // if(!app.auth || typeof app.auth === 'undefined') {
    //     throw new Error("auth não carregado corretamente!");
    // }else {
        app.use(app.auth.initialize() );
    // }
    app.use((req, res, next) => {
        if(req.body && typeof req.body === 'object')
            delete req.body.id, console.log(req.body)
        else 
            req.body = {};
        
        next();
    });
}; 