const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils");

const isValidContactId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
    // next(HttpError(404, 'User not found.`));
  }
  next();
};

module.exports = isValidContactId;
