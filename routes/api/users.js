const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const {
  validateContactBody,
  authenticate,
  upload
} = require("../../middlewares");

const { schemas } = require("../../models/user");

router.patch(
  "/", authenticate,
  validateContactBody(schemas.userChangeSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);


module.exports = router;
