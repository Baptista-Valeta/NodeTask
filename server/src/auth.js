const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const cfg = require("./libs/config.js")();

module.exports = app => {
    const Users = app.database.models.Users; // Modelo User
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: cfg.params.jwtSecret
    };

    const strategy = new Strategy(opts, (payload, done) => {
        Users.findByPk(payload.id)
            .then(user => {                
                if (user) {
                    return done(null, user)
                }
                return done(null, false);
            })
            .catch(error => {
                console.log("Erro:", error.message);
                return done(error, null)
            });
    });
    passport.use(strategy);
    
    return app.auth = {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", cfg.params.jwtSession),
    };
};