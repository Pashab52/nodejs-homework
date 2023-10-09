const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../utils");
const path = require("path");
const fs = require("fs/promises")

const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

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

// https://github.com/HakuMatsunoki/node_course05/blob/master/09/services/imageService.js

const updateAvatar = ctrlWrapper(async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  // console.log(req.file)
// const jimpPatch = path.join(
//   "public",
//   "avatars",
//   originalname
// ).toString;

 Jimp.read(
   "./tmp/Photo-not-available-man.png"
 )
   .then((image) => {
     return image
       .resize(250, 250) // resize
       .write("./tmp/Photo-not-available-man.png"); // save
   })
   .catch((err) => {
     console.error(err);
   });

  // const resultUpload = path.join(avatarsDir, originalname);
  // await fs.rename(tmpUpload, resultUpload)

  // const avatarURL = path.join("avatars", originalname)

  // const { id } = req.user;
  // const result = await User.findByIdAndUpdate(id, {
  //   avatarURL,
  // });
  // if (!result) {
  //   throw HttpError(404, "Not found");
  // }
  // res.status(200).json({
  //   avatarURL
  // });

})



module.exports = {
  updateSubscription,
  updateAvatar
};
