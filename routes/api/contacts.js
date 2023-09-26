const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateContactBody,
  isValidContactId,
} = require("../../middlewares");
const schemas = require("../../schemas/contactSchema");

router
  .route("/")
  .get(ctrl.getAllContacts)
  .post(
    validateContactBody(schemas.addSchema),
    ctrl.addContact
  );

router
  .route("/:contactId")
  .get(isValidContactId, ctrl.getContactById)
  .put(
    isValidContactId,
    validateContactBody(schemas.addSchema),
    ctrl.updateContactById
  )
  .delete(isValidContactId, ctrl.delContactById);

router.patch(
  "/:contactId/favorite",
  validateContactBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
