const {body} = require("express-validator");

const createUserValidator = [
  body("firstName", "first name is required and must be a string")
  .notEmpty()
  .isString()
  .isLength({max:100})
  .trim(),

  body("lastName", "last must be a string")
  .optional()
  .isString()
  .isLength({max:100})
  .trim(),

  body("email", "email is required and must be a string")
  .notEmpty()
  .isEmail()
  .isLength({max:200})
  .trim(),

  body("password", "password must be alphanumeric with atleast 1 special char and 1 capital letter")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
  .notEmpty()
  .isLength({min:8}),
];

module.exports = createUserValidator;