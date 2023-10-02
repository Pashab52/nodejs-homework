const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const {
  validateContactBody,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

router.patch(
  "/", authenticate,
  validateContactBody(schemas.userChangeSubscriptionSchema),
  ctrl.updateSubscription
);


module.exports = router;
