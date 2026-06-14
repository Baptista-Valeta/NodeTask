const assert = require("chai");

describe("Routes: Index", () => {
    describe("GET /", () => {
        it("Status de retorno da API", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    const expected = {status: "NodeTask"};
                    expected(res.body).to.eql(expected),
                    done(err);
                });
        });
    });
});