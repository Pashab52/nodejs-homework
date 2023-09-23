const contacts = require("../models/contacts");
const { HttpError } = require("../utils");


const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    // const { error } = addSchema.validate(req.body);

    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const delContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(201).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    // const { error } = addSchema.validate(req.body);

    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    const { contactId } = req.params;
    console.log(contactId)
    const result = await contacts.editContact(
      contactId,
      req.body
    );
    
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  delContactById,
  updateContactById,
};
