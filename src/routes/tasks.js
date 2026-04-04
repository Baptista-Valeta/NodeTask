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
            Tasks.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            // Adiciona/Cadastra tarefas
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    console.status(412).json({msg: error.message})
                });
        });
    app.route("/tasks:id")
        .all((req, res) => {
            // Middleware de pré-execução de rotas
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // Consulta uma tarefa
            Tasks.findOne({where: req.params})
                .then(result => {
                    if(result)
                        res.json(result);
                    else
                        res.senStatus(404);
                })
                .catch(error =>{
                    res.status(412).json({msg: error.message});
                })
                
        })
        .put((req, res) => {
            // Atualiza uma tarefa
            Tasks.update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    response.status(412).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            // Exclui uma tarefa
            Tasks.destroy({where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
};
