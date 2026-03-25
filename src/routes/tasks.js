module.exports =  (sequelize, Datatype) => {
    // Cria tabela Tasks
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatype.STRING,
            allowNull: false, //  pode ser vazia - não
            validate: {
                notEmpty: true, // não pode ser string vazia
            }
        },
        done: {
            type: Datatype.BOOLEAN,
            allowNull: false,
            defaultValue: false // Estado inicial da task (não concluída)
        }, 
        
        // classMethods: {
        //     associate: (models) => {
        //         Tasks.belongsTo(models.Users); 
        //     }
        // }
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users); // Define o relacionamento - cada task pertence a um user
    }

    return Tasks; // Exporta o modelo tasks para uso no projecto
    
    // const Tasks = app.models.tasks;

    // app.get("/tasks", (req, res) => {
    //     Tasks.findAll({}, (tasks) => {
    //         res.json({tasks: tasks})
    //     });
    // });
};
