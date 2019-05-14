import supertest from "supertest";
import should from "should";

let server = supertest.agent("http://localhost:3000");

describe("Phone Number Generator", () => {
  it("should return 200", (done) => {
    server
      .get("/api/v1")
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});
