module.exports =  app => {
    const Tasks = app.database.models.Tasks;

    // .route() - permite agrupar vários métodos HTTP numa mesma rota
    app.route("/tasks")
        .all((req, res, next) => { // Serve para validação, autenticação, logs
            //Middleware de pre-execução das rotas
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // Lista tarefas
            Tasks.findAll(({}))
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            // Adiciona/Cadastra tarefas
        });
    app.route("/tasks:id")
        .all((req, res) => {
            // Middleware de pré-execução de rotas
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // Consulta uma tarefa
        })
        .put((req, res) => {
            // Atualiza uma tarefa
        })
        .delete((req, res) => {
            // Exclui uma tarefa
        })
};
