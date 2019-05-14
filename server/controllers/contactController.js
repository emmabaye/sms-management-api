import Model from '../models';

const { Contact } = Model;

class ContactController {
  static addContact(req, res) {
    Contact.findOne({ where: { phoneNumber: req.body.phoneNumber } })
      .then(existingContact => {
        if (existingContact) {
          return res.status(409).send({
            status: 'Fail',
            message: 'Contact already exists',
            data: {
              name: existingContact.name,
              phoneNumber: existingContact.phoneNumber
            }
          });
        }

        Contact.create({
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
        }).then(savedContact => res.status(200).send({
          status: 'Success',
          message: 'Contact created',
          data: savedContact,
        }));
      }).catch(e => res.status(500).send({
        status: 'Error',
        message: "There was an error in creating contact. Pls try again"
      }));
  }

  static updateContact(req, res) {
    const { name, phoneNumber } = req.body;
    Contact.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      }
    }).then(existingContact => {
      if (!existingContact) {
        return res.status(404).send({ status: 'Error', message: 'Contact not found' });
      }
      Contact.update({
        name: req.body.name || existingContact.name,
        phoneNumber: req.body.phoneNumber || existingContact.phoneNumber
      }, {
        where: {
          phoneNumber: req.body.phoneNumber
        }
      }).then(updated => res.status(200).send({
        status: 'Success',
        message: 'Contact Updated',
        data: updated[0] === 1 ?
          { name, phoneNumber } :
          { name: existingContact.name, phoneNumber: existingContact.phoneNumber }
      }));
    }).catch(e => {
      console.log("Error ", e);
      return res.status(500).send({
        status: ' Server Error',
        message: 'Cannot update contact'
      });
    });
  }

  static getAllContacts(req, res) {
    Contact.findAll()
      .then(contacts => {
        res.status(200).send({
          status: 'Success',
          message: 'All contacts retrieved',
          data: contacts
        });
      }).catch(e => res.status(500).send({
        status: ' Server Error',
        message: 'Cannot retrieve all contacts'
      }));
  }

  static getContact(req, res) {
    const { phoneNumber } = req.params;
    Contact.findOne({ where: { phoneNumber: phoneNumber } })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ status: 'Error', message: 'Contact does not exist' });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Contact found',
          data: contact,
        });
      }).catch(e => res.status(500).send({
        status: ' Server Error',
        message: 'Cannot retrieve contact'
      }));
  }

  static deleteContact(req, res) {
    const { phoneNumber } = req.params;
    Contact.findOne({ where: { phoneNumber: phoneNumber } })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ status: 'Error', message: 'Contact does not exist' });
        }
        Contact.destroy({ where: { phoneNumber: phoneNumber } })
          .then(updated => res.status(200).send({
            status: 'Success',
            message: updated === 1 ?
              "Contact deleted successfully" : "Contact not deleted successfully"
          }));
      }).catch(e => res.status(500).send({
        status: ' Server Error',
        message: 'Cannot retrieve contact'
      }));
  }
}

export default ContactController;
