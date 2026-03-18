module.exports =  app => {
    app.models.tasks =  {
        findAll: (params, callback) => {
            return callback([
                {title: "Estudar Programação diariamente"},
                {title: "Orar todos os dias"},
            ]);
        }
    }
};