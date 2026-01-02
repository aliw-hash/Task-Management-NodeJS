const { body } = require("express-validator");

const deleteTaskValidator = [
    body("_id", "ID is required to perform deletion").notEmpty(),
  ];

  module.exports = deleteTaskValidator;