const jwt = require("jwt-simple");
const cfg = require("../libs/config.js")();
const bcrypt = require("bcrypt");

module.exports = app => {
    const Users = app.database.models.Users;

    app.post("/token", (req, res) => {
        console.log(req.body);
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({where: {email: email}})
                .then(user => {
                    if (!user) {
                        return res.status(404).json("Credenciais inválidas");
                    }
                    
                    if (bcrypt.compare(user.password, password)) { // compara a senha enviada
                        const payload = {id: user.id};

                        console.log("Usuário ",user.name,":",user.password)
                        
                        return res.json({ // retorna token do usuário autenticado
                            token: jwt.encode(payload, cfg.params.jwtSecret) // gerar token 
                        });
                    }else {
                        res.status(401).send("Acesso negado");
                    }
                })
                .catch(error => { res.status(401).json({error: error.message}) });
        }else {
            return res.status(401).json({message: "email e password são obrigatórios"});
        }
    });
};


// Documentação do endpoint /token
/**
 * @api [POST] /token Token autenticado
 * @apiGroup Credencial
 * @apiParam {String} email Email do usuário
 * @apiParam {String} password Password do usuário
 * @apiParamExample {json} Entrada
 *      {
 *          "email": "john@gmail.com",
 *          "password": "1234"
 *      }
 * @apiSuccess {String} token Token do usuário autenticado
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      {"token": "xyzh..."}
 * @apiErrorExample
 *      HTTP/1.1 401 Unauthorized
 * 
 */