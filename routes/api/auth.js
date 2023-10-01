const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const {
  validateContactBody,
  isValidContactId,
} = require("../../middlewares");

const {schemas} = require("../../models/user");

router.post("/register",validateContactBody(schemas.userRegisterSchema), ctrl.registerUser);

router.post("/login",validateContactBody(schemas.userLoginSchema), ctrl.loginUser );

module.exports = router;
