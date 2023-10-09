const validateContactBody = require("./validateContactBody");
const isValidContactId = require("./isValidContactId");
const authenticate = require("./authenticate");
const upload = require("./upload")

module.exports = {
  validateContactBody,
  isValidContactId,
  authenticate,
  upload,
};
