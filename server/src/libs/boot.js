module.exports =  app => {
    if (process.env.NODE_ENV !== "test") {
        // Criar tabelas e sicronizar modelos com o banco através do método sync do sequilize
        app.database.sequelize.sync()
        .then(() => {
            app.listen(app.get("port"), () => {
                console.log(`NodeTask Rodando em http://localhost:${app.get("port")}/`,);
            });
        })
        .catch(err => console.error(err.message));
    };
};