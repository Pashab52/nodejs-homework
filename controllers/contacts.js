const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { favorite } = req.query;

  const pag = Number(req.query.page);

  let page = 1;
  if (
    !Number.isNaN(pag) &&
    req.query.page !== "" &&
    pag !== 0
  ) {
    page = req.query.page;
  } 

  const lim = Number(req.query.limit);

  let limit = 20;
  if (
    !Number.isNaN(lim) &&
    req.query.limit !== "" &&
    lim !== 0
  ) {
    limit = req.query.limit;
  }

  if (favorite === "true" || favorite === "false") {
    const skip = (page - 1) * limit;
    const result = await Contact.find(
      { owner, favorite },
      "-secondArg",
      { skip, limit }
    ).populate("owner", "email subscription");
    res.status(200).json(result);
    return;
  }

  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner },
    "-secondArg",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.status(200).json(result);
};


const getContactById = ctrlWrapper(
  async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  }
);


const addContact = ctrlWrapper(async (req, res, next) => {
  const { id: owner } = req.user;
  const result = await Contact.create({
    ...req.body,
    owner,
  });
  res.status(201).json(result);
});


const delContactById = ctrlWrapper(
  async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(
      contactId
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  }
);


const updateContactById = ctrlWrapper(
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
