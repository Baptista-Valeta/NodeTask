module.exports =  app => {
    // Criar tabelas e sicronizar modelos com o banco através do método sync do sequilize
    app.database.sync()
        .then(() => {
            app.listen(app.get("port"), () => {
                console.log(`NodeTask Rodando na porta ${app.get("port")}`);
            });
        })
        .catch(err => console.error(err));
}