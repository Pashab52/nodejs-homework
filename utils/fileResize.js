const Jimp = require("jimp");

const fileResize = async (tmpUpload) => {
  await Jimp.read(tmpUpload)
    .then((image) => {
      return image.cover(250, 250).write(tmpUpload);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = fileResize;
