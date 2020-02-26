let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Admins or users access", () => {
  beforeEach(done => {
    done();
  });

  describe("/GET users", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .get("/users/getusers")
        .query({
          amount: 1,
          page: 1,
          firstName: "none",
          lastName: "none",
          email: "none"
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/Delete user", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .delete("/users/delete")
        .query({
          id: 2
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/PUT edit profile", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .put("/users/editprofile")
        .send({
          firstName: "dfssdfsdffsd",
          lastName: "sdgggsdsdgd"
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/PUT remove request", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .put("/users/removerequest")

        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/PUT add admin", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .put("/users/addadmin")
        .query({
          id: 1
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/PUT delete admin", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .put("/users/deleteadmin")
        .query({
          id: 1
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/PUT change password", () => {
    it("it should GET status 401 (we are not admin or auth user)", done => {
      chai
        .request(server)
        .put("/users/changePassword")
        .send({
          prevPassword: "dsffsd2213132",
          newPassword: "dsffsd12132ds"
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
