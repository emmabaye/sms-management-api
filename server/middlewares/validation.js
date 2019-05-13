import validator from 'validator';

export const validatePhoneNumber = (req, res, next) => {
  if (!req.params.phoneNumber || !validator.isMobilePhone(req.params.phoneNumber, 'any')) {
    return res.status(400).send({
      status: "Error",
      message: "Phone number is required",
    });
  }
  return next();
};

export const validateContact = (req, res, next) => {
  if (!req.body.phoneNumber || !validator.isMobilePhone(req.body.phoneNumber, 'any')) {
    return res.status(400).send({
      status: "Error",
      message: "Phone number is required",
    });
  }
  if (!req.body.name) {
    return res.status(400).send({
      status: "Error",
      message: "Contact name is required",
    });
  }
  return next();
};

export const validateSMS = (req, res, next) => {
  if (!req.body.sender || !validator.isMobilePhone(req.body.sender, 'any')) {
    return res.status(400).send({
      status: "Error",
      message: "Number of sender is required",
    });
  }

  if (!req.body.receiver || !validator.isMobilePhone(req.body.receiver, 'any')) {
    return res.status(400).send({
      status: "Error",
      message: "Number of sender is required",
    });
  }

  if (!req.body.message) {
    return res.status(400).send({
      status: "Error",
      message: "Message is required",
    });
  }

  return next();
};

