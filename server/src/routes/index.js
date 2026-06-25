
module.exports =  app => {

/**
* @api [GET] / API STATUS
* @apiGroup Status
* @apiSuccess {String} status Mensagem de status da api
* @apiSuccessExample {json} Sucesso
*   HTTP/1.1 200 OK
*   {"service": "NodeTask"}      
*/

    app.get("/", (req, res) => {

        res.json({
            status: "online",
            service: "NodeTask",
        });
    });
};