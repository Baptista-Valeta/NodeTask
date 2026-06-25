module.exports =  app => {
    const Tasks = app.database.models.Tasks;

    // .route() - permite agrupar vários métodos HTTP numa mesma rota
    app.route("/tasks")
        .all(app.auth.authenticate()) // executa autenticação para todos os métodos da dessa rota
        .get((req, res) => {
            // Lista tarefas
            Tasks.findAll({
                where: {user_id: req.user.id}
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
                    id: req.id,
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


// DOCUMENTAÇÃO DO ENDPOINT [GET] /tasks

/**
 * @api [GET] /tasks Consulta de tarefas
 * @apiGroup Tarefas
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Header
 *      {"Authorization": "Bear xyzh..."}
 * @apiSuccess {Object[]} tasks Lista de tarefas
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} title Título da tarefa
 * @apiSuccess {Boolean} done Status da tarefa 
 * @apiSuccess {Date} updated_at Data de atualização
 * @apiSuccess {Date} created_at Data de criação/registro
 * @apiSuccess {Number} userId Id do usuário
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      [{
 *          "id": 1,
 *          "title": "Estudar",
 *          "done": true,
 *          "updated_at": "2026-07-22T15:46:51.778Z",
 *          "created_at": "2026-07-22T15:46:51.778Z,
 *          "userId": "1"
 *      }]
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */


// DOCUMENTAÇÃO DO ENDPOINT [POST] /tasks

/**
 * @api [POST] /tasks Cria nova tarefa
 * @apiGroup Tarefas
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Entrada
 *      {"Authorization": "Bear xyzh..."}
 * @apiParam {String} title título da tarefa
 * @apiParamExample {json} Entrada
 *      {"title": "Estudar"}
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} title Título da tarefa
 * @apiSuccess {Boolean} done Status da tarefa 
 * @apiSuccess {Date} updated_at Data de atualização
 * @apiSuccess {Date} created_at Data de criação/registro
 * @apiSuccess {Number} userId Id do usuário
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "title": "Estudar",
 *          "done": true,
 *          "updated_at": "2026-07-22T15:46:51.778Z",
 *          "created_at": "2026-07-22T15:46:51.778Z,
 *          "userId": "1"
 *      }
 * @apiErrorExample Erro ao criar nova tarefa
 *      HTTP/1.1 412 Precondition Failed
 */



// DOCUMENTAÇÃO DO ENDPOINT [GET] /tasks/:id

/**
 * @api [GET] /tasks/:id Cria nova tarefa
 * @apiGroup Tarefas
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Entrada
 *      {"Authorization": "Bear xyzh..."}
 * @apiParam {Number} id Id da tarefa
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} title Título da tarefa
 * @apiSuccess {Boolean} done Status da tarefa 
 * @apiSuccess {Date} updated_at Data de atualização
 * @apiSuccess {Date} created_at Data de criação/registro
 * @apiSuccess {Number} userId Id do usuário
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "title": "Estudar",
 *          "done": true,
 *          "updated_at": "2026-07-22T15:46:51.778Z",
 *          "created_at": "2026-07-22T15:46:51.778Z,
 *          "userId": "1"
 *      }
 * @apiErrorExample {json} Tarefa inexistente
 *      HTTP/1.1 404 Not Foun
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */



// DOCUMENTAÇÃO DO ENDPOINT [PUT] /tasks/:id

/**
 * @api [PUT] /tasks/:id Atualiza uma tarefa
 * @apiGroup Tarefas
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Entrada
 *      {"Authorization": "Bear xyzh..."}
 * @apiParam {id} id Id da tarefa
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} title Título da tarefa
 * @apiSuccess {Boolean} done Status da tarefa 
 * @apiSuccess {Date} updated_at Data de atualização
 * @apiSuccess {Date} created_at Data de criação/registro
 * @apiSuccess {Number} userId Id do usuário
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      {
 *          "title": "Treinar",
 *          "done": false,
 *      }
 * @apiErrorExample {json} Sucesso
 *      HTTP/1.1 204 No Content
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */


// DOCUMENTAÇÃO DO ENDPOINT [DELETE] /tasks/:id

/**
 * @api [DELETE] /tasks/:id Exclui uma tarefa
 * @apiGroup Tarefas
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Header
 *      {"Authorization": "Bear xyzh..."}
 * @apiSuccess {Number} id Id da tarefa
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 204 Not Content
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */
