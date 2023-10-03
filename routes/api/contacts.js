const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  validateContactBody,
  isValidContactId,
  authenticate,
} = require("../../middlewares");

const schemas = require("../../schemas/contactSchema");

router
  .route("/")
  .get(authenticate, ctrl.getAllContacts)
  .post(
    authenticate,
    validateContactBody(schemas.addSchema),
    ctrl.addContact
  );

router
  .route("/:contactId")
  .get(
    authenticate,
    isValidContactId,
    ctrl.getContactById)
  .put(
    authenticate,
    isValidContactId,
    validateContactBody(schemas.addSchema),
    ctrl.updateContactById
  )
  .delete(
    authenticate,
    isValidContactId,
    ctrl.delContactById
  );

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateContactBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
