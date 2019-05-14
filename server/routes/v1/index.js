import { ContactController, MessageController } from '../../controllers';
import { validatePhoneNumber, validateContact, validateSMS } from "../../middlewares/validation";

const routes = (app) => {
  app.route('/api/v1')
    .get((req, res) => res.send({ title: 'Welcome to my SMS management API' }));

  app.route('/api/v1/contacts')
    .get(ContactController.getAllContacts)
    .post(validateContact, ContactController.addContact)
    .put(validateContact, ContactController.updateContact);

  app.route('/api/v1/contacts/:phoneNumber')
    .get(validatePhoneNumber, ContactController.getContact)
    .delete(validatePhoneNumber, ContactController.deleteContact);

  app.route('/api/v1/messages')
    .get(MessageController.getAllMessages)
    .post(validateSMS, MessageController.sendMessage);

  app.route('/api/v1/messages/:phoneNumber/inbox')
    .get(validatePhoneNumber, MessageController.getReceivedMessages);

  app.route('/api/v1/messages/:phoneNumber/sentbox')
    .get(validatePhoneNumber, MessageController.getSentMessages);

  app.route('/api/v1/messages/:phoneNumber/all')
    .get(validatePhoneNumber, MessageController.getContactMessages);
};

export default routes;
