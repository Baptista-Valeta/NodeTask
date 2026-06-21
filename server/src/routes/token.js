const jwt = require("jwt-simple");
const cfg = require("../libs/config.js")();
const bcrypt = require("bcrypt");

// Login

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
                        console.log("usuário ",user.name,":",user.password)
                        res.json({
                            token: jwt.encode(payload, cfg.params.jwtSecret) // gerar token 
                        });
                    }else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => { res.status(401).json({error: error.message}) });
        }else {
            return res.status(401).json({message: "email e password são obrigatórios"});
        }
    });
};