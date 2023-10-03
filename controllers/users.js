const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../utils");

const updateSubscription = ctrlWrapper(async (req, res) => {
  const { id, email } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(id, {
    subscription,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    email,
    subscription,
  });
});

module.exports = {
  updateSubscription,
};
