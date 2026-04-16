module.exports =  app => {
    const Tasks = app.database.models.Tasks;

    // .route() - permite agrupar vários métodos HTTP numa mesma rota
    app.route("/tasks")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // Lista tarefas
            Tasks.findAll({
                where: {user_id: req.body.id}
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(500).json({msg: error.message});
                });
        })
        .post((req, res) => {
            // Adiciona/Cadastra tarefas
            req.body.user_id = req.user.id;     
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(500).json({msg: error.message})
                });
        });
    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // Consulta uma tarefa
            Tasks.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id 
                }
            })
                .then(result => {
                    if(result)
                        res.json(result);
                    else
                        res.sendStatus(404);
                })
                .catch(error =>{
                    res.status(500).json({msg: error.message});
                })
                
        })
        .put((req, res) => {
            // Atualiza uma tarefa
            Tasks.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.user.id    
                }
            }) // where: req.params - define a condição de busca por meio dos parâmetros da url (depois /: na url)
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(500).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            // Exclui uma tarefa
            Tasks.destroy({where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(500).json({msg: error.message});
                });
        });
};
