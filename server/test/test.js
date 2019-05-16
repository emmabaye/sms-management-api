/* eslint-disable max-nested-callbacks */
import supertest from "supertest";
import should from "should";

let server = supertest.agent("http://localhost:3000");
const getRandomPhoneNumber = () => {
  let min = Math.ceil(100000000);
  let max = Math.floor(999999999);
  return `0${Math.floor(Math.random() * (max - min)) + min}`;
};

let contact = {
  name: "Joe",
  phoneNumber: getRandomPhoneNumber(),
};

let sender = {
  name: "Jack",
  phoneNumber: getRandomPhoneNumber(),
};

let receiver = {
  name: "Jane",
  phoneNumber: getRandomPhoneNumber(),
};

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

  describe("Contacts", () => {
    it("get all Contacts", (done) => {
      server
        .get("/api/v1/contacts")
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('All contacts retrieved');
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    });

    it("should successfully add Contacts, should return 200", (done) => {
      server
        .post("/api/v1/contacts")
        .send(contact)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Contact created');
          (res.body.data.name).should.equal(contact.name);
          (res.body.data.phoneNumber).should.equal(contact.phoneNumber);
          done();
        });
    });

    it("should not add existing Contact, should return 409", (done) => {
      server
        .post("/api/v1/contacts")
        .send(contact)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          (res.body.status).should.equal('Fail');
          (res.body.message).should.equal('Contact already exists');
          done();
        });
    });

    it("should not add invalid Contact phone number, should return 400", (done) => {
      server
        .post("/api/v1/contacts")
        .send({name: "Jean", phoneNumber: "abc" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Phone number is required');
          done();
        });
    });

    it("should not add invalid Contact name, should return 400", (done) => {
      server
        .post("/api/v1/contacts")
        .send({ phoneNumber: "0123456788" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Contact name is required');
          done();
        });
    });

    it("should update contact succesfully, should return 200", (done) => {
      contact.name = "Tom";
      server
        .put("/api/v1/contacts")
        .send(contact)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Contact Updated');
          (res.body.data.name).should.equal(contact.name);
          (res.body.data.phoneNumber).should.equal(contact.phoneNumber);
          done();
        });
    });

    it("should get contact succesfully, should return 200", (done) => {
      contact.name = "Tom";
      server
        .get(`/api/v1/contacts/${contact.phoneNumber}/`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Contact found');
          (res.body.data.name).should.equal(contact.name);
          (res.body.data.phoneNumber).should.equal(contact.phoneNumber);
          done();
        });
    });

    it("should not get contact for invalid number, should return 400", (done) => {
      contact.name = "Tom";
      server
        .get("/api/v1/contacts/aa/")
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Phone number is required');
          done();
        });
    });

    it("should delete contact succesfully, should return 200", (done) => {
      contact.name = "Tom";
      server
        .del(`/api/v1/contacts/${contact.phoneNumber}/`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Contact deleted successfully');
          done();
        });
    });
  });

  describe("Messages", () => {
    before(() => {
      server
        .post("/api/v1/contacts")
        .send(sender)
        .expect(200)
        .end((err, res) => {
        });


      server
        .post("/api/v1/contacts")
        .send(receiver)
        .expect(200)
        .end((err, res) => {
        });
    });

    it("get all messages successfully", (done) => {
      server
        .get("/api/v1/messages")
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('All messages retrieved');
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    });


    it("should successfully send message, should return 200", (done) => {
      server
        .post("/api/v1/messages")
        .send({
          sender: sender.phoneNumber,
          receiver: receiver.phoneNumber,
          message: "Hello",
        })
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Message sent');
          (res.body.data.status).should.equal('sent');
          (res.body.data.message).should.equal('Hello');
          (res.body.data.sender).should.equal(sender.phoneNumber);
          (res.body.data.receiver).should.equal(receiver.phoneNumber);
          done();
        });
    });

    it("should not send message  to invalid phone number, should return 400", (done) => {
      server
        .post("/api/v1/messages")
        .send({
          sender: sender.phoneNumber,
          receiver: "aa",
          message: "Hello",
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Number of receiver is required');
          done();
        });
    });

    it("should not send message  from invalid phone number, should return 400", (done) => {
      server
        .post("/api/v1/messages")
        .send({
          sender: "aa",
          receiver: receiver.phoneNumber,
          message: "Hello",
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Number of sender is required');
          done();
        });
    });

    it("should not send undefined message, should return 400", (done) => {
      server
        .post("/api/v1/messages")
        .send({
          sender: sender.phoneNumber,
          receiver: receiver.phoneNumber,
          message: undefined,
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Message is required');
          done();
        });
    });

    it("should not send message to contact not in database, should return 500", (done) => {
      server
        .post("/api/v1/messages")
        .send({
          sender: sender.phoneNumber,
          receiver: "98765432102345",
          message: "Hello",
        })
        .expect(500)
        .end((err, res) => {
          res.status.should.equal(500);
          (res.body.status).should.equal('Failed');
          (res.body.message).should.equal('Messsage could not be sent. Pls ensure numbers are added contacts');
          done();
        });
    });

    it("get all received messages for a contact", (done) => {
      server
        .get(`/api/v1/messages/${receiver.phoneNumber}/inbox`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal(`Messages received by ${receiver.phoneNumber} retrieved`);
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    });

    it("get all sent messages for a contact", (done) => {
      server
        .get(`/api/v1/messages/${sender.phoneNumber}/sentbox`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal(`Messages sent by ${sender.phoneNumber} retrieved`);
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    });

    it("get all messages for a contact", (done) => {
      server
        .get(`/api/v1/messages/${sender.phoneNumber}/all`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal(`All messages for ${sender.phoneNumber} retrieved`);
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    });
  });
});
