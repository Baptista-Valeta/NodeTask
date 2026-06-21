// Arquivo de configuração de conexão entre o mySQL e o sequelize
module.exports = {
    database: 'nodeTask',
    username: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    params: {
        dialect: 'mysql', // Banco de dados a ser usado
        storage: 'ntask.mysql', // Directório onde será guardado os dados do banco de dados
        logging: false,
        define: {
            underscore: true // adiciona underscore no lugar dos espaços em branco
        },
        jwtSecret: "Ntask_Test", // mantém uma string de chave secreta
        jwtSession: {session: false}
    }
};