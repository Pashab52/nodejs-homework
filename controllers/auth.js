const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../utils");

const { SECRET_KEY, BASE_URL } = process.env;

const registerUser = ctrlWrapper(async (req, res) => {
  const { password, email } = req.body;

  const hashPass = await bcrypt.hash(password, 10);

  const defAvatar = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL: defAvatar,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
});

const loginUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });

  if (!result) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(
    password,
    result.password
  );

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: result._id };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });

  await User.findByIdAndUpdate(
    result._id,
    { token }
    // { new: true }
  );

  res.status(200).json({
    token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
});

const logoutUser = ctrlWrapper(async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });

  res.sendStatus(204);
});

const currentUser = ctrlWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
};
