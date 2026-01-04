const {body} = require("express-validator");

const loginUserValidator = [
  body("email")
  .isEmail().withMessage("format should be email")
  .notEmpty().withMessage("email is mandatory")
  .trim(),
  body("password").isLength({min:8}).isString(),
  // body("password").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/).notEmpty(),
];

module.exports = loginUserValidator;