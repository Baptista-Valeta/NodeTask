const app = require("../..");
const request = require("supertest")(app);
const { expect } = require("chai");

describe("Routes: Token", () => {
    const userModel = app.database.models.Users;
    
    describe("POST /token", () => {
        beforeEach(done => {
            //codigo de teste
            userModel.create({name: "Jonh", email: "john@gmail.com", password: "1234"})
                .then(user =>  {
                    send("User create: ", user.name);
                })
                .then(done());
        });
        describe("Status 200", () => {
            it("Retorna token do usuário autenticado", done => {
                request.post("/token")
                    .send({
                        email: "baptistavaleta@gmail.com",
                        password: "1234"
                    })
                    .expect(200)
                    .end(((err, res) => {
                        expect(request.params).to.include.keys("token"); 
                        done(err);
                    }));
            });

        });
        describe("Status 401", () => {
            it("Lança erro quando password for incorrecta", done => {
                request.post("/token")
                    // .send({
                    //     email: "baptistavaleta@gmail.com",
                    //     password: "password-incorrect"
                    // })
                    .expect(401)
                    .end((err, res) => done(err));
            });
            it("Lança erro quando email for incorrecto", done => {
                request.post("/token")
                    // .send({
                    //     email: "email-incorrect",
                    //     password: "1234"
                    // })
                    .expect(401)
                    .end((err, res) => done(err));
            });
            it("Lança erro quando password e email estiverem em branco", done => {
                request.post("/token")
                    .expect(401)
                    .end((err, res) => done(err));
            });
        });
    });
});