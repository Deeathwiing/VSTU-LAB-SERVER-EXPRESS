let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Admin access", () => {
  beforeEach(done => {
    done();
  });

  describe("/GET users", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get(
          "/users/getusers?amount=1&page=1&firstName=none&lastName=none&email=none"
        )
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
