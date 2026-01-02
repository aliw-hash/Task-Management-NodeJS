const {body} = require("express-validator");

const updateTaskValidator = [
  body("_id", "A valid document ID is required").notEmpty().isMongoId(),

  body("title","title must be a string").optional().isString().trim(),
  body("title","title must be a string").isLength({ max:100 }),

  body("dueDate","due date must be in ISO-8601 format").optional().isISO8601(),

  body("description","description must be a string").optional().isString().trim(),
  body("description","description must be a string").isLength({max:500}),

  body("priority","priority must be a string").optional().isIn('high','normal','low').trim(),

  body("status","status must be a string").optional().isIn('todo','inProgress','completed').trim(),
];

module.exports = updateTaskValidator;