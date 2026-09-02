const https = require('https');
const fs = require('fs');

module.exports =  app => {
    if (process.env.NODE_ENV !== "test") {
        const credentials = {
            key: fs.readFileSync('private.key', 'utf-8'),
            cert: fs.readFileSync('certificate.crt', 'utf-8')
        };

        // Criar tabelas e sicronizar modelos com o banco através do método sync do sequilize
        app.database.sequelize.sync()
        .then(() => {
            https.createServer(credentials, app)
                .listen(app.get("port"), () => {
                    console.log(`NodeTask Rodando em https://localhost:${app.get("port")}/`,);
                });
        })
        .catch(err => console.error(err.message));
    };
};