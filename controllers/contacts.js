const Contact = require('../models/contact')
const { HttpError, ctrlWrapper } = require("../utils");


const getAllContacts = async (req, res) => {
  const result = await Contact.find();
    res.status(200).json(result);
};

const getContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
});

const addContact = ctrlWrapper(async (req, res, next) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
});

const delContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete (contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(201).json({ message: "contact deleted" });
});

const updateContactById = ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
});

const updateFavorite = ctrlWrapper(
  async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  }
);

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  delContactById,
  updateContactById,
  updateFavorite,
};
