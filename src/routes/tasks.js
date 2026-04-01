module.exports =  app => {
    const Tasks = app.database.models.Tasks;

    app.get("/tasks", (req, res) => {
       Tasks.findAll({}).then(Tasks => {
        res.json(
            {
                Tasks: Tasks
            }
        );
       })
    });
};
