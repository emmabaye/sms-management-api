//import path from 'path';
import { ContactController, MessageController } from '../../controllers';

const routes = (app) => {
  app.route('/api/v1')
    .get((req, res) => res.send({ title: 'Welcome to my SMS management API' }));

  app.route('/api/v1/contacts')
    .get(ContactController.getAllContacts)
    .put(ContactController.updateContact)
    .post(ContactController.addContact);

  app.route('/api/v1/contacts/:phoneNumber')
    .get(ContactController.getContact)
    .delete(ContactController.deleteContact);

  app.route('/api/v1/messages')
    .get(MessageController.getAllMessages)
    .post(MessageController.sendMessage);

  app.route('/api/v1/messages/:phoneNumber/inbox')
    .get(MessageController.getReceivedMessages);

  app.route('/api/v1/messages/:phoneNumber/sentbox')
    .get(MessageController.getSentMessages);

  app.route('/api/v1/messages/:phoneNumber/all')
    .get(MessageController.getContactMessages);
};

export default routes;
