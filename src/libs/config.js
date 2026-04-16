// Arquivo de configuração de conexão entre o mySQL e o sequelize

// const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    database: 'nodeTask',
    username: 'admin.dev', 
    password: 'Admin_dev2k3',
    params: {
        dialect: 'mysql', // Banco de dados a ser usado
        storage: 'ntask.mysql', // Directório onde será guardado os dados do banco de dados
        define: {
            underscore: true // adiciona underscore no lugar dos espaços em branco
        },
        jwtSecret: "Nta$k_API", // mantém uma string de chave secreta
        jwtSession: {session: false}
    }
};