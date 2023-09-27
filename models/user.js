const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscriptionTypes = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
}).options({ abortEarly: false });

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
}).options({ abortEarly: false });

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};

userSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  const status =
    name === "MongoServerError" && code === 11000
      ? 409
      : 400;
  error.status = status;
  next();
});

const User = model("user", userSchema);

module.exports = User;
