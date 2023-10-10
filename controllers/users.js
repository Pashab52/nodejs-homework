const { User } = require("../models/user");
const {
  ctrlWrapper,
  HttpError,
  fileResize,
} = require("../utils");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(
  __dirname,
  "../",
  "public",
  "avatars"
);

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

const updateAvatar = ctrlWrapper(async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Bad request");
  }

  const { path: tmpUpload, originalname } = req.file;

  await fileResize(tmpUpload);

  const { id } = req.user;

  const uniqueFileName = `${id}_${originalname}`;
  const resultUpload = path.join(
    avatarsDir,
    uniqueFileName
  );
  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", uniqueFileName);

  const result = await User.findByIdAndUpdate(id, {
    avatarURL,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    avatarURL,
  });
});

module.exports = {
  updateSubscription,
  updateAvatar,
};
