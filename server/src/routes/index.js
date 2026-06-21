
module.exports =  app => {
    app.get("/", (req, res) => {
            const UserModel = app.database.models.Users;

            const User = UserModel.findAll()
                .then(users => {
                    res.json({
                        status: "online",
                        service: "NodeTask",
                        timestamp: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
                        users: users,

                    });
                 })
                .catch(err => {
                    res.json({error: err.message})
                })
            }
    )
}