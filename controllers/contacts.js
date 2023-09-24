const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");


const getAllContacts = ctrlWrapper(async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
});

const getContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
});

const addContact = ctrlWrapper(async (req, res, next) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);

});

const delContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(201).json({ message: "contact deleted" });
});

const updateContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.editContact(
      contactId,
      req.body
    );
    
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
});

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  delContactById,
  updateContactById,
};
