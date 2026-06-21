const { expect } = require("chai");
const app = require("../..");
const assert = require("chai").assert
const request = require("supertest")(app)

describe("Routes: Index", () => {
    describe("GET /", () => {
        it("Retorna os dados bases da API", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    assert.equal(res.body.service, "NodeTask");
                    done(err);
                });
        });
    });
});