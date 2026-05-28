const supertest = require("supertest");
const chai = require("chai");
const app = require("../index.js");

// para que o servidor carregue os módulos chai e supertest do mocha como variáveis global
global.app = app;
global.request = supertest(app);
global.expect = chai.expect;