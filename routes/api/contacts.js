const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {validateContactBody} = require('../../middlewares')
const schemas = require('../../schemas/contactSchema')

// router.get('/', ctrl.getAllContacts);

// router.post('/', ctrl.addContact);

// router.get('/:contactId', ctrl.getContactById);

// router.delete('/:contactId', ctrl.delContactById);

// router.put('/:contactId', ctrl.updateContactById)

router
  .route("/")
  .get(ctrl.getAllContacts)
  .post(validateContactBody(schemas.addSchema), ctrl.addContact);

router
  .route("/:contactId")
  .get(ctrl.getContactById)
  .put(validateContactBody(schemas.addSchema), ctrl.updateContactById)
  .delete(ctrl.delContactById);


module.exports = router
