const passport = require("passport");
const { Strategy } = require("passport-jwt");
const cfg = require("./libs/config");
// console.log(cfg.params.jwtSecret)

module.exports = app => {
    const Users = app.database.models.Users; // Modelo user
    // const cfg = app.libs.config; // Arquivo de configuração da database
    const strategy = new Strategy({
        jwtFromRequest: cfg.params.jwtSession,
        secretOrKey: cfg.params.jwtSecret
    }, (payload, done) => {
        Users.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    })
                }
                return done(null, false);
            })
            .catch(error => done(error, null))
    });
    passport.use(strategy);
    return app.auth = {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", cfg.jwtSession)
    };
};