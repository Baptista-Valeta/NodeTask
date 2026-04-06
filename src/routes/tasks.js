module.exports =  app => {
    const Tasks = app.database.models.Tasks;

    // .route() - permite agrupar vários métodos HTTP numa mesma rota
    app.route("/tasks")
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
