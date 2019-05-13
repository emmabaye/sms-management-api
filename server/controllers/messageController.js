import Sequelize from 'sequelize';
import Model from '../models';

const { Message } = Model;
const { Op } = Sequelize;


class MessageController {
  static sendMessage(req, res) {
    const { sender, receiver, message } = req.body;

    Message.create({
      sender: sender,
      receiver: receiver,
      message: message
    }).then(savedMessage => res.status(200).send({
      status: 'Success',
      message: 'Message sent',
      data: savedMessage,
    })).catch(e => res.status(500).send({
      status: 'Failed',
      message: 'Messsage could not be sent. Pls ensure numbers are added contacts',
    }));
  }

  static getAllMessages(req, res) {
    Message.findAll()
      .then(messages => res.status(200).send({
        status: 'Success',
        message: 'All messages retrieved',
        data: messages,
      }))
      .catch(e => res.status(500).send({
        status: 'Failed',
        message: 'All messages could not be retrieved',
      }));
  }

  static getReceivedMessages(req, res) {
    const { phoneNumber } = req.params;
    Message.findAll({
      where: {
        receiver: phoneNumber,
      }
    })
      .then(messages => res.status(200).send({
        status: 'Success',
        message: `Messages received by ${phoneNumber} retrieved`,
        data: messages,
      }))
      .catch(e => res.status(500).send({
        status: 'Failed',
        message: `Failed to retrieve received messages for ${phoneNumber} `,
      }));
  }

  static getSentMessages(req, res) {
    const { phoneNumber } = req.params;
    Message.findAll({
      where: {
        sender: phoneNumber,
      }
    })
      .then(messages => res.status(200).send({
        status: 'Success',
        message: `Messages sent by ${phoneNumber} retrieved`,
        data: messages,
      }))
      .catch(e => res.status(500).send({
        status: 'Failed',
        message: `Failed to retrieve sent messages for ${phoneNumber} `,
      }));
  }

  static getContactMessages(req, res) {
    const { phoneNumber } = req.params;
    Message.findAll({
      where: {
        [Op.or]: [{ sender: phoneNumber }, { receiver: phoneNumber }],
      }
    })
      .then(messages => res.status(200).send({
        status: 'Success',
        message: `All messages for ${phoneNumber} retrieved`,
        data: messages,
      }))
      .catch(e => res.status(500).send({
        status: 'Failed',
        message: `Failed to retrieve all messages for ${phoneNumber} `,
      }));
  }
}

export default MessageController;
