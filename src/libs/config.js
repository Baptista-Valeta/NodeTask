// Arquivo de configuração de conexão entre o sqlite3 e o sequelize

// const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    database: 'ntask',
    username: '', // nome do usuário
    password: '',
    params: {
        dialect: 'sqlite', // Banco de dados a ser usado
        storage: 'ntask.sqlite', // Directório onde será guardado os dados do banco de dados
        define: {
            underscore: true // adiciona underscore no lugar dos espaços em branco
        }
    }
};