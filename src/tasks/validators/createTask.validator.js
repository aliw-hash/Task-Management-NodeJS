const { body } = require("express-validator");

const createTaskValidator = [
    body("title", "The title cannot be empty").notEmpty(),
    body("title", "the title must be string").isString(),
    body("title").isLength({ max : 150 }),

    body("dueDate", "dueDate can't be empty").notEmpty(),
    body("dueDate", "dueDate must be ISO8601 format").isISO8601(),

    body("description","The body length can't be empty and needed to be a string").notEmpty().isString().trim(),
    body("description","Length must not exceed 500 chars").isLength({ max : 500 }),

    body("priority").isIn(["low","normal", "high"]),
    body("status").isIn(["todo","inProgress", "completed"]),
  ];

  module.exports = createTaskValidator;