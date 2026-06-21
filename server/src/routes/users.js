module.exports = app => {
    const Users = app.database.models.Users;
    
    app.route("/users")
        .all(app.auth.authenticate()) // midleware de autenticação
        .get((req, res) => {
            console.log(req)
            Users.findByPk(req.user.id, { // busca um único registro através do id
                attributes: ["id", "name", "email"] // retorna apenas os campos especificados da tabela
            }).then(result => {
                if(result) {
                    res.json(result);
                }else {
                    res.status(404).json({message: "Usuário não encontrado"});
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
