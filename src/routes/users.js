const usersRoute = (app) => {
    const Users = app.database.models.Users;

    // Listar um usuários
    app.get("/users:id", (req, res) => {
        Users.findById(req.params.id, {
            attribute: [
                'id',
                'email',
                'email'
            ]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message})
        });
    });

    // Excluir um usuário
    app.delete("/users:id", (req, res) => {
        Users.destroy({where: {id: req.params.id}})
            .the(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
};

module.exports = {
    usersRoute
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