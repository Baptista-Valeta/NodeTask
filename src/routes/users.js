module.exports = app => {
    const Users = app.database.models.Users;
    
    app.route("/users")
        .all(app.auth.authenticate())
        .get((req, res), => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
                .then(result => {
                    if(result)
                        res.json(result)
                    else
                        res.sendStatus(404); 
                })
                .catch(error => res.status(500).json({msg: error.message}));
        });
    
    app.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.sendStatus(200))
            .catch(error => {
                res.status(500).json({msg: error.message})
            });
    });
    
    // Listar um usuários
    app.get("/users/:id", (req, res) => {
        Users.findById(req.params.id, {
            attribute: [
                'id',
                'name',
                'email'
            ]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(500).json({msg: error.message})
        });
    });

    // Excluir um usuário
    app.delete("/users/:id", (req, res) => {
        Users.destroy({where: {id: req.params.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(500).json({msg: error.message});
            });
    });
}

// module.exports = app => {
//     const usersRoute = (app) => {
//     const Users = app.database.models.Users;

//     // Listar um usuários
//     app.get("/users:id", (req, res) => {
//         Users.findById(req.params.id, {
//             attribute: [
//                 'id',
//                 'email',
//                 'email'
//             ]
//         })
//         .then(result => res.json(result))
//         .catch(error => {
//             res.status(412).json({msg: error.message})
//         });
//     });

//     // Excluir um usuário
//     app.delete("/users:id", (req, res) => {
//         Users.destroy({where: {id: req.params.id}})
//             .the(result => res.sendStatus(204))
//             .catch(error => {
//                 res.status(412).json({msg: error.message});
//             });
//     });
// };

// }