module.exports =  app => {
    app.listen(3000, () => {
        console.log(`NodeTask Rodando na porta ${app.get("port")}`);
    });
}