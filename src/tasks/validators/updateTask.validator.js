const { body } = require("express-validator");

const updateTaskValidator = [
  body("_id", "A valid document ID is required").notEmpty().isMongoId(),

  body("title")
    .optional()
    .isString().withMessage("title must be a string")
    .isLength({ max: 100 }).withMessage("title must be at most 100 characters")
    .trim(),

  body("dueDate","due date must be in ISO-8601 format").optional().isISO8601(),

  body("description")
    .optional()
    .isString().withMessage("description must be a string")
    .isLength({ max: 500 }).withMessage("description must be at most 500 characters")
    .trim(),

  body("priority","priority must be a string").optional().isIn(['high','normal','low']).trim(),

  body("status","status must be a string").optional().isIn(['todo','inProgress','completed']).trim(),
];

module.exports = updateTaskValidator;