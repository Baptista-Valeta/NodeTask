const jwt = require("jwt-simple");
const cfg = require("../libs/config.js");

// Login

module.exports = app => {
    const Users = app.database.models.Users;

    app.post("/token", (req, res) => {
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({where: {email: email}})
                .then(user => {
                    if (Users.isPassword(user.password, password)) { // compara a senha enviada
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.params.jwtSecret) // gerar token 
                        });
                    }else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => { res.sendStatus(401) });
        }else {
            res.sendStatus(401);
        }
    });
};