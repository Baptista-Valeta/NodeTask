module.exports = app => {
    const Users = app.database.models.Users;
    

    app.route("/users")
        .all(app.auth.authenticate()) // midleware de autenticação
        .get((req, res) => {
            console.log(req.user)
            Users.findByPk(req.user.id, { // busca um único registro através do id
                attributes: ["id", "name", "email"] // retorna apenas os campos especificados da tabela
            }).then(result => {
                if(result) {
                    return res.json(result);
                }else {
                    return res.status(404).json({message: "Usuário não encontrado"});
                }
            }).catch(error => {
                res.status(500).json({msg: error.message})
            })
        })
    
    app.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.status(200).json({message: result}))
            .catch(error => {
                res.status(500).json({msg: error.message})
            });
    });
    
    // Listar um usuários
    app.get("/users/:id",app.auth.authenticate(), (req, res) => {
        Users.findByPk(req.params.id)
            .then(result => {
                if(!result) return res.status(404).json({message: "Usuário não encontrado"});

                return res.status(200).json({message: result, params: req.params});
            })
            .catch(error => {
                return res.status(500).json({msg: error.message})
        });
    });

    // Excluir um usuário
    app.delete("/users/:id", (req, res) => {
        Users.destroy({where: {id: req.params.id}})
            .then(result => { 
                if(result) {
                    return res.status(200).json("Usuário deletado!")
                }

                return res.status(404).json({message: "Usuário não encontrado"});
            
            })
            .catch(error => {
                return res.status(500).json({msg: error.message});
            });
    });
}

// Documentação do endpoint [GET] /users

/**
 * @api [GET] /users Mostra usuário autenticado
 * @apiGroup Usuário
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Header
 *      {"Authorization": "Bear xyzh..."}
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} name Nome
 * @apiSuccess {String} email Email
 * @apiSuccessExample
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "name": "john",
 *          "email": "john@gmail.com"
 *      }
 * 
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */

// Documentação do endpoint [POST] /users

/**
 * @api [POST] /users Cadastra novo usuário
 * @apiGroup Usuário
 * @apiParam {String} name Nome
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * @apiParamExample {json} Sucesso
 *      {
 *          "name": "Leon Kennedy",
 *          "email": "leon@gmail.com",
 *          "password": "1234"
 *      }
 * @apiSuccess {Number} id Id de registro
 * @apiSuccess {String} name Nome
 * @apiSuccess {String} email Email
 * @apiSuccess {String} password Senha criptografada
 * @apiSuccess {Date} updated_at Data de atualização
 * @apiSuccess {Date} created_at Data de criação/registro
 * @apiSuccessExample {json} Sucesso
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "name": "Leon Kennedy",
 *          "email": "leon@gmail.com",
 *          "password": "1234",
 *          "updated_at": "2026-07-22T15:46:51.778Z",
 *          "created_at": "2026-07-22T15:46:51.778Z
 *      }
 * @apiErrorExample
 *      HTTP/1.1 412 Precondition Failed
 */


// Documentação do endpoint [DELETE] /users

/**
 * @api [DELETE] /users Exclui usuário autenticado
 * @apiGroup Usuário
 * @apiHeader {String} Authorization Token do usuário
 * @apiHeaderExample {json} Header
 *      {"Authorization": "Bear xyzh..."}
 * @apiSuccessExample
 *      HTTP/1.1 204 No Content
 * @apiErrorExample {json} Erro de consulta
 *      HTTP/1.1 412 Precondition Failed
 */