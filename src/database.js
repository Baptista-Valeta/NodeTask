const fs = require("fs"); // file system - serve para ler pastas, arquivos, etc
const path = require("path"); // para construir caminhos de arquivos de forma segura
const { Sequelize } = require("sequelize");
const config = require("./libs/config");

// let sequelize = null;
let database = null;


module.exports = app => {
    if(!database) {
        // const config = app.libs.config;
        const sequelize = new Sequelize( // Cria a conexão com o banco
            config.database,
            config.username,
            config.password,
            config.params
        );
        database = {
            sequelize, // conexão ativa
            Sequelize, // biblioteca (contém os tipos)
            models: {} // local de armazenamento dos modelos
        };
        const dir = path.join(__dirname, 'models'); // define o caminho da pasta models
        fs.readdirSync(dir).forEach(file => { // ler todos os ficheiros dentro da pasta models para carregamento automático
            const modelDir = path.join(dir, file); // cria caminho completo para cada model
            // const model = sequelize.import(modelDir);
            const model = require(modelDir)(sequelize, Sequelize.DataTypes); // importar o model
            database.models[model.name] = model; // guarda o model no objecto database.model
        });
        // console.log(fs.readdirSync(dir)); // ler os arquivos
        // console.log(database.models); // arquivos guardados

        Object.keys(database.models).forEach(key => { // associações entre os modelos
            database.models[key].associate(database.models);
        })
    }
    // return app.database = sequelize;
    return app.database = database; 
}