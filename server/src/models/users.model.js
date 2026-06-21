const bcrypt = require("bcrypt");

module.exports = (sequelize, Datatype) => {
    const Users = sequelize.define("Users", {
        id: {
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Datatype.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },    
        },
        email: {
            type: Datatype.STRING,
            unique: true, // não permite emails duplicados
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Datatype.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Tasks); // Definido o relacionamento 1 : N e cria um userId na tabela Tasks 
    };
    {
        // hooks são eventos automáticos
        hooks: {
            beforeCreate: Users => { // antes de salvar no banco
                const salt = bcrypt.genSalt(); // gera um numero aleatório - salto
                Users.password = bcrypt.hash(Users.password, salt); // gera um hash com a senha do usuário
            }
        }
    }
    return Users;
}