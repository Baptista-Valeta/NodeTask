module.exports =  app => {
    app.get("/", (req, res) => res.json({
            // tasks: {
            //     status: "online",
            //     service: "NodeTask",
            //     timestamp: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
            // }
            status: "Online"
        })
    );
}